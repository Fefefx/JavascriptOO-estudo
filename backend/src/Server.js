const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes');

const server = express();

server.use(express.json());
mongoose.connect('mongodb+srv://Felipe:pardim@project-nlohq.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true
});
server.use(routes);

server.listen(3333);