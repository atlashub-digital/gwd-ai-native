const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const paths=['member','builder','investor','client'];
export function validateLead(d){
 if(!d||typeof d!=='object'||Array.isArray(d))return 'Pedido inválido.';
 if(d.website)return 'Pedido não aceite.';
 if(!paths.includes(d.path))return 'Seleciona um percurso.';
 if(typeof d.name!=='string'||d.name.trim().length<2||d.name.length>100)return 'Confirma o teu nome.';
 if(typeof d.email!=='string'||d.email.length>180||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))return 'Confirma o e-mail.';
 if(d.consent!==true||d.adult!==true)return 'Confirma o consentimento e a idade mínima.';
 for(const [key,max] of [['market',40],['area',80],['intent',1000]])if(typeof d[key]!=='string'||d[key].length>max)return 'Confirma os campos do pedido.';
 return null;
}
async function digest(s){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(bytes)).map(x=>x.toString(16).padStart(2,'0')).join('');}
async function rateLimit(env,key,limit){const current=await env.BUCKET.get(key);const n=current?Number(await current.text()):0;if(n>=limit)return false;const write=await env.BUCKET.put(key,String(n+1),{onlyIf:current?{etagMatches:current.etag}:{etagDoesNotMatch:'*'},customMetadata:{expires:String(Date.now()+86400000)}});return !!write;}
export async function api(request,env,ctx={waitUntil(){}}){const url=new URL(request.url),path=url.pathname;
 if(path==='/api/health')return json({ok:true,leads:!!(env.BUCKET&&env.GENESIS_ADMIN_TOKEN),assistant:'guided',version:'0.3'});
 if(path==='/api/leads'&&request.method==='POST'){
  if(request.headers.get('origin')!==url.origin)return json({error:'Origem não autorizada.'},403);
  if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'Formato inválido.'},415);
  if(!env.BUCKET||!env.GENESIS_ADMIN_TOKEN)return json({error:'O registo está temporariamente indisponível.'},503);
  let d;try{const raw=await request.text();if(raw.length>5000)return json({error:'Pedido demasiado grande.'},413);d=JSON.parse(raw)}catch{return json({error:'Pedido inválido.'},400)}const error=validateLead(d);if(error)return json({error},400);
  const hour=new Date().toISOString().slice(0,13);const ip=request.headers.get('cf-connecting-ip')||'unknown';const key='limits/'+hour+'/'+await digest(env.GENESIS_ADMIN_TOKEN+ip);
  if(!await rateLimit(env,key,5))return json({error:'Limite temporário de pedidos. Tenta mais tarde.'},429);
  const reference=crypto.randomUUID(),createdAt=new Date().toISOString();const record={reference,createdAt,expiresAt:new Date(Date.now()+90*86400000).toISOString(),name:d.name.trim(),email:d.email.trim().toLowerCase(),market:d.market,area:d.area,intent:d.intent.trim(),path:d.path,consent:true,consentVersion:'2026-11-05-v1',adult:true,status:'new',source:'genesis-public',paymentStatus:'not_requested'};
  await env.BUCKET.put('leads/'+createdAt.slice(0,10)+'/'+reference+'.json',JSON.stringify(record),{httpMetadata:{contentType:'application/json'},customMetadata:{expires:record.expiresAt}});
  // Limited cleanup, only records past the published retention period.
  ctx.waitUntil(cleanup(env).catch(()=>{}));return json({reference,status:'registered'},201);
 }
 if(path==='/api/admin/leads'){
  if(!env.GENESIS_ADMIN_TOKEN||request.headers.get('authorization')!=='Bearer '+env.GENESIS_ADMIN_TOKEN)return json({error:'Não autorizado.'},401);
  if(request.method==='GET'){const listed=await env.BUCKET.list({prefix:'leads/',limit:50,cursor:url.searchParams.get('cursor')||undefined});const records=await Promise.all(listed.objects.map(async o=>JSON.parse(await (await env.BUCKET.get(o.key)).text())));return json({records,cursor:listed.truncated?listed.cursor:null});}
  if(request.method==='DELETE'){const key=url.searchParams.get('key');if(!key||!/^leads\/\d{4}-\d{2}-\d{2}\/[a-f0-9-]{36}\.json$/.test(key))return json({error:'Chave inválida.'},400);await env.BUCKET.delete(key);return json({deleted:true});}
 }
 if(path==='/api/chat')return json({mode:'guided',message:'A API de IA será ligada numa fase seguinte. Usa as opções do percurso guiado.'});
 return json({error:'Não encontrado.'},404);
}
async function cleanup(env){for(const prefix of ['leads/','limits/']){const list=await env.BUCKET.list({prefix,limit:30,include:['customMetadata']});for(const o of list.objects){const raw=o.customMetadata?.expires;const expiry=prefix==='limits/'?Number(raw):Date.parse(raw);if(expiry&&expiry<Date.now())await env.BUCKET.delete(o.key)}}}

