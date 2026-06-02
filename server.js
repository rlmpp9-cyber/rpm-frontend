const http=require('http'),https=require('https'),PORT=process.env.PORT||3000;
const URL='https://raw.githubusercontent.com/rlmpp9-cyber/rpm-frontend/main/index.html';
http.createServer((req,res)=>{
  https.get(URL,r=>{
    let d='';
    r.on('data',c=>d+=c);
    r.on('end',()=>{
      res.setHeader('Content-Type','text/html; charset=utf-8');
      res.setHeader('Cache-Control','no-cache');
      res.writeHead(200);
      res.end(d);
    });
  }).on('error',e=>{res.writeHead(500);res.end('Error: '+e.message)});
}).listen(PORT,()=>console.log('RPM corriendo en puerto',PORT));
