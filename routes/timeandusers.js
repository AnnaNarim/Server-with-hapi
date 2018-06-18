const Handlers = require('../handlers/timeandusers.js');
const Joi = require('joi');

const routes = [];
module.exports = routes;

routes.push({
	method: 'GET',
    path: '/hello',
	handler: Handlers.helloWorld,
	config: {
		tags: ['api']
	}
});

routes.push({
    method: 'GET',
    path: '/time',
    handler: Handlers.time,
    config: {
		tags: ['api']
	}
});

routes.push({
    method:'GET',
    path: '/form',
    handler: Handlers.renderForm,
    config: {
		tags: ['api']
	}
});

routes.push({
    method: 'POST',
    path:'/form',
    handler: Handlers.postForm,
    config: {
		tags: ['api']
	}
});

routes.push({
    method: 'GET',
    path: '/result',
    handler: Handlers.result,
    config: {
		tags: ['api']
	}
});

routes.push({
    method: 'GET', 
    path: '/api/time',
    handler: Handlers.apiTime,
    config: {
		tags: ['api']
	}
});

routes.push({
    method: 'POST',
    path:'/api/users',
    handler: Handlers.postApiUsers,
    config: {
    	validate: {
    		payload: {
    			username: Joi.string().min(1).required(),
    			password: Joi.string().min(1).required(),
    			gender: Joi.any().valid("Male", "Female", "Other").required(),
    			agree: Joi.any().valid(true,false).required()
    		}
    	},

		tags: ['api']
    }
});

routes.push({
    method: 'GET',
    path: '/api/users',
    handler: Handlers.renderApiUsers,
    config: {
		tags: ['api']
	}
});