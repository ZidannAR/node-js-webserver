const http = require("http");
const { buffer } = require("stream/consumers");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  

  const { url } = request;
  const method = request.method;

  if (url === "/") {
    if (method === "GET") {
       response.statusCode = 200;
      response.end("ini adalah homepage");
    } else {
       response.statusCode = 400;
      response.end(`halam ini tidak bisa diakses bang soalnya kamu jomok plus kamu juga ${method}`);
    }
  }

  if (url === "/about") {
    if (method === "GET") {
       response.statusCode = 200;
      response.end("halo ini adalah halaman about");
    } else if (method === "POST") {
       response.statusCode = 200 ;
      let uwu = [];

      request.on("data", (chunk) => {
        uwu.push(chunk);
      });

      request.on("end", () => {
        uwu = Buffer.concat(uwu).toString();
        const { name } = JSON.parse(uwu);
        response.end(`halo ${name}! ini adalah surat untuk kamu(about)`);
      });
    } else {
       response.statusCode = 400;
      response.end(
        `mau kemana bang? kamu ga bisa masuk soalnya kamu ${method} request`
      );
    }
  } else {
       response.statusCode = 404;
    response.end("halaman tidak ditemukan");
  }

  // if(method === 'GET'){
  //        response.end("<h1>halo</h1>");
  // }
  // if(method === 'POST'){
  //        let body = [];

  // request.on('data', (chunk) => {
  //        body.push(chunk);
  // });

  // request.on('end', (chunk) => {
  //        body = Buffer.concat(body).toString();
  //        const {name} = JSON.parse(body);
  //        response.end(`<h1>hai , ${name}!</h1>`);
  // });

  // }
  // if(method === 'DELETE'){
  //        response.end("<h1>halo apacoba</h1>");
  // }
  // if(method === 'PUT'){
  //        response.end("<h1>halo gua</h1>");
  // }
  // let body = [];

  // request.on('data', (chunk) => {
  //        body.push(chunk);
  // });

  // request.on('end', (chunk) => {
  //        body = Buffer.concat(body).toString();
  // });
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`server sedang jalan bang sori sori aja http://${port}:${host}`);
});
