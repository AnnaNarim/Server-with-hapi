const Handlers = require('../handlers/timeandusers.js');
const Joi = require('joi');

const routes = [];
module.exports = routes;

routes.push({
	method: 'GET',
    path: '/',
	handler: Handlers.helloWorld
});

routes.push({
    method: 'GET',
    path: '/time',
    handler: Handlers.time
});

routes.push({
    method:'GET',
    path: '/form',
    handler: Handlers.renderForm
});

routes.push({
    method: 'POST',
    path:'/form',
    handler: Handlers.postForm,
});

routes.push({
    method: 'GET',
    path: '/result',
    handler: Handlers.result
});

routes.push({
    method: 'GET', 
    path: '/api/time',
    handler: Handlers.apiTime
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
    	}
    }
});

routes.push({
    method: 'GET',
    path: '/api/users',
    handler: Handlers.renderApiUsers
});