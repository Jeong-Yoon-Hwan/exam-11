const { execFile } = require("child_process");
const fs = require("fs");
const http = require('http'); 
const { json } = require("stream/consumers");
const qs = require('querystring')

function fileRead(filename){
  const text = fs.readFileSync(`${filename}.txt`,'utf-8');
  return text
}

let str =`<!DOCTYPE html>`
str += fileRead('head');
str += fileRead('header');
str += fileRead('main');
str += fileRead('footer');

function router(url){
  let text = fs.readFileSync(`${url}.txt`,'utf-8')
  return text
}

const server = http.createServer(function(request,response){ 
  let{method} = request
  if(method === "GET"){ 
    let url = request.url
    if(url !== '/favicon.ico' && url !== "/"){
      console.log(url)
      response.writeHead(200)
      response.write(str + router(url.substring(1)),'utf-8')
      response.end()
    }
  }else if(method === 'POST'){
   
    request.on('data',function(data){
      let text = qs.parse(data.toString())
      text.time = new Date();
      const dataJSON = JSON.stringify(text)
      fs.writeFileSync('test-json.json',dataJSON)
    })
  }


  response.writeHead(200,{'Content-Type':'text/html'});
  fs.readFile(__dirname + "/index.txt",(err,data)=>{
    if(err){
      return console.error(err)
    }
    response.end(data,'utf-8');
  })
});

server.listen(8080, function(){ 
  console.log('Server is running...');
});