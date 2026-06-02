const http=require('http'),https=require('https'),PORT=process.env.PORT||3000;

function getHTML(cb){
  const opt={
    hostname:'raw.githubusercontent.com',
    path:'/rlmpp9-cyber/rpm-frontend/main/index.html',
    headers:{'Cache-Control':'no-cache','Pragma':'no-cache','User-Agent':'RPM/1.0'}
  };
  https.get(opt,r=>{
    let d='';
    r.on('data',c=>d+=c);
    r.on('end',()=>cb(d));
  }).on('error',e=>cb(null));
}

http.createServer((req,res)=>{
  getHTML(html=>{
    if(!html){res.writeHead(500);res.end('Error');return;}
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','no-cache');
    res.writeHead(200);
    res.end(html);
    console.log('Sirviendo',html.length,'bytes');
  });
}).listen(PORT,()=>console.log('RPM en puerto',PORT));
