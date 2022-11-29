

const fs = require("fs");
const http = require('http'); 

function fileRead(filename){
  const text = fs.readFileSync(`${filename}.txt`,'utf-8');
  return text
}


let html = `<!DOCTYPE html>`
let main_txt = fileRead('main');
let head_txt = fileRead('head');
let header_txt = fileRead('header');
let footer_txt = fileRead('footer');

//* 이렇게 문자열로 합쳐도 되는건가요?,,
let str = html.concat(head_txt,header_txt,main_txt,footer_txt)
fs.writeFile('./index.txt',str,err=>{
  if(err){
    console.log(err)
    return;
  }
})

const server = http.createServer(function(request,response){ 
  let{url,method} = request
  if(method === "GET"){
    
    //*이렇게 반복되는 부분은 하나로 합쳐져야 하나요? 근데 url이 다른데 어떻게 합칠지 모르겠습니다.
    if(url === "/a"){
      response.writeHead(200)
      response.write(html+head_txt+"<h1>a 페이지 입니다.</h1>")
      response.end()
    }
    if(url === "/b"){
      response.writeHead(200)
      response.write(html+head_txt+"<h1>b 페이지 입니다.</h1>")
      response.end()
    }
    if(url === "/c"){
      response.writeHead(200)
      response.write(html+head_txt+"<h1>c 페이지 입니다.</h1>")
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