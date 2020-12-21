const express = require('express') 
const nunjucks = require('nunjucks') 
const routes = require('./src/routes') // chamando rotas
const server = express()  
const methodOverride = require('method-override') // usando o metodo put

server.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if (req.headers["x-forwarded-proto"] == "http") //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes) 


//template engine
server.set('view engine', 'njk') 

nunjucks.configure('src/app/views', { 
    express: server,
    autoescape: false, // - pegando formatação html 
    noCache: true // - tirando o cache
})


//servidor
server.listen(3000, function () {
    console.log('Server is running')
})



