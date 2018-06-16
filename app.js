'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Pug = require('pug');
const routes = require('./routes/timeandusers.js');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register(require('inert'));
    await server.register(require('vision'));
    
    server.views({
        engines: { pug: Pug },
        path: __dirname + '/views'
    });
    server.route(routes);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

