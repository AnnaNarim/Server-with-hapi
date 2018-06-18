const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Pug = require('pug');
const HapiSwagger = require('hapi-swagger');
const routes = require('./routes/timeandusers.js');
const Pack = require('./package.json');
const swaggerOptions = { 
    info: {
        'title' : Pack.name,
        'version': Pack.version
    },
    documentationPath: '/',
    jsonEditor: true,
    schemes : [ 'http', 'https']
};
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {
    await server.register([
            Inert, 
            Vision, 
            {
                plugin: HapiSwagger,
                options:swaggerOptions,
            },
        ]);
    //await server.register(require('vision'));
    
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

