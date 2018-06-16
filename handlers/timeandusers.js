const moment = require('moment');
const fetch = require('node-fetch');

const timeandusers = {};
module.exports = timeandusers;

const arrayOfPeople = [];

timeandusers.helloWorld = (request, h) =>{
	return 'Hello World!';
}

timeandusers.time = (request, h) => {
    return moment().format("HH:mm:ss");
}

timeandusers.renderForm = (request, h) =>{
    return h.view('form');
}

timeandusers.postForm = (request, h) => {
    const { username, password, gender,agree } = request.payload;
    const obj = {
            username,
            password,
            gender,
            agree: agree ? true : false
        }
    return fetch('http://localhost:3000/api/users',{
        method: 'POST',       
        headers: {
                'Content-Type': 'application/json'         
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            if(response.status === 200){
                return h.redirect('/result');
            }
            else{
                return h.view('form',{errors: 'Error'})
            }
        })    
}

timeandusers.result = (request, h) => {
    return h.view('result', {arr: arrayOfPeople});
}

timeandusers.apiTime = (request, h) => {
    return JSON.stringify(moment().format("HH:mm:ss")); 
}

timeandusers.postApiUsers = (request, h) =>{
    const {username, password, gender, agree} = request.payload;
    console.log(request.payload.username)
    arrayOfPeople.push({username, password, gender, agree});
    return 'posted';
}

timeandusers.renderApiUsers = (request, h) =>{
    return JSON.stringify(arrayOfPeople);
}
