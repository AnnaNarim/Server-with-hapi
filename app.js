'use strict';

const Hapi = require('hapi');
const moment = require('moment');
const Vision = require('vision');
const Pug = require('pug');

const arrayOfPeople = [];

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'Hello, world!';
    }
});

server.route({
    method: 'GET',
    path: '/time',
    handler: (request, h) => {
        return moment().format("HH:mm:ss");;
    }
});

server.route({
    method:'GET',
    path: '/form',
    handler: (request, h) =>{
        return h.view('form');
    }
});

server.route({
    method: 'POST',
    path:'/form',
    handler: (request, h) => {
        const { username, password, gender,agree } = request.payload;
        arrayOfPeople.push({username, password, gender, agree: agree ? "true" : "false"});
        console.log(arrayOfPeople);
        return h.redirect('/result');

    }
});

server.route({
    method: 'GET',
    path: '/result',
    handler: (request, h) =>{
        return h.view('result', {arr: arrayOfPeople});
    }
});

server.route({
    method: 'GET', 
    path: '/api/time',
    handler: (request, h) => {
        return JSON.stringify(moment().format("HH:mm:ss")); 
    }
});

server.route({
    method: 'POST',
    path: '/api/users',
    handler: (request, h) =>{
        const {username, password, gender, agree} = request.payload;
        arrayOfPeople.push({username, password, gender, agree});
        console.log(arrayOfPeople);
        return 'posted'  ;
    }
});

server.route({
    method: 'GET',
    path: '/api/users',
    handler: (request, h) =>{
        return JSON.stringify(arrayOfPeople)  ;
    }
});

const init = async () => {
    await server.register(require('inert'));
    await server.register(require('vision'));

    server.views({
        engines: { pug: Pug },
        path: __dirname + '/views'
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

/*server.route({
    method: 'GET',
    path: '/{user*2}',
    handler: (request, h) => {
        const userParts = request.params.user.split('/');
        return 'Hello, ' + encodeURIComponent(userParts[0]) + ' ' + encodeURIComponent(userParts[1]) + '!';
    }
});*/

/*server.route({
    method: 'GET',
    path: '/hello/{user}',
    handler: (request, h) => {
        const user = request.params.user ? encodeURIComponent(request.params.user) : 'ancanot';
        return `Hello ${user}`;
    }
});*/