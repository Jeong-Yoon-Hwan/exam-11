const fs = require("fs");
const http = require('http'); 




function fileRead(filename){
  const text = fs.readFileSync(`${filename}.txt`,'utf-8');
  return text
}


let str =`<!DOCTYPE html>`
str += fileRead('head');
str += fileRead('header');
str += fileRead('main');
str += fileRead('footer');


fs.writeFile('./index.txt',str,err=>{
  if(err){
    console.log(err)
    return;
  }
})

const server = http.createServer(function(request,response){ 
  let{url,method} = request
  if(method === "GET"){
    
    if(url === "/a"){
      response.writeHead(200)
      response.write(str + fileRead('a'),'utf-8')
      response.end()
    }
    if(url === "/b"){
      response.writeHead(200)
      response.write(str+fileRead('b'),'utf-8')
      response.end()
    }
    if(url === "/c"){
      response.writeHead(200)
      response.write(str+fileRead('c'),'utf-8')
      response.end()
    }
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