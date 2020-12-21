const express = require('express');
const routes = express.Router(); 

const members = require('./app/controllers/members') 


routes.get('/', members.index);

// routes.get('/index', function(req, res){
//     return res.render('index')
// })

routes.post('/index', members.post) 



module.exports = routes