const http = require('http');
const fs = require('fs');
const https = require('https');
const path = require('path');

const PORT = process.env.PORT || 3000;
const REPO = 'rlmpp9-cyber/rpm-frontend';
const FILE = 'index.html';

function descargarArchivo(cb) {
  const url = `https://raw.githubusercontent.com/${REPO}/main/${FILE}`;
  https.get(url, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      if (data.length > 10000) {
        fs.writeFileSync(path.join(__dirname, FILE), data);
        console.log(`✓ index.html actualizado: ${data.length} bytes`);
      }
      cb();
    });
  }).on('error', e => { console.error('Error descargando:', e.message); cb(); });
}

descargarArchivo(() => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    fs.readFile(path.join(__dirname, FILE), (err, data) => {
      if (err) { res.writeHead(500); res.end('Error'); return; }
      res.writeHead(200);
      res.end(data);
    });
  });
  server.listen(PORT, () => console.log(`RPM App corriendo en puerto ${PORT}`));
});
