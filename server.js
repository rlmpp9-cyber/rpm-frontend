const http=require('http'),https=require('https'),PORT=process.env.PORT||3000;

function getHTML(cb){
  const opt={
    hostname:'api.github.com',
    path:'/repos/rlmpp9-cyber/rpm-frontend/contents/index.html',
    headers:{'User-Agent':'RPM','Accept':'application/vnd.github.v3.raw'}
  };
  https.get(opt,r=>{
    let d='';
    r.on('data',c=>d+=c);
    r.on('end',()=>{
      console.log('GitHub API bytes:',d.length);
      cb(d);
    });
  }).on('error',e=>{console.error(e.message);cb(null);});
}

http.createServer((req,res)=>{
  getHTML(html=>{
    if(!html||html.length<1000){res.writeHead(500);res.end('Error cargando archivo');return;}
    res.setHeader('Content-Type','text/html; charset=utf-8');
    res.setHeader('Cache-Control','no-cache');
    res.writeHead(200);
    res.end(html);
  });
}).listen(PORT,()=>console.log('RPM en puerto',PORT));
