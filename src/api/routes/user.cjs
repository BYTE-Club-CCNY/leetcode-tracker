require("dotenv").config({ path: '../../.env'}) //configure the api environment
const express = require("express");
const router = express.Router();
const https = require('https');

//this route makes use of the leetcode api built by Arghya Das et al which could be found at https://github.com/alfaArghya/alfa-leetcode-api
//there is a rate limit so be careful since nodemon is running and also 

router.get('/', (req, res) => { //just about the users profile
    //req.query is looking at the query in the url string i.e. anything after the ? seperator like ?user=BVasquez07 
    const user = Object.values(req.query)[0] !== undefined ? decodeURIComponent(Object.values(req.query)[0]) : 'BVasquez07'; //grab the user from the query else just use my stats
    https.get(`https://alfa-leetcode-api.onrender.com/${user}`, (apiRes) => {
        console.log(user)
        const { statusCode } = apiRes;
        const contentType = apiRes.headers['content-type'];

        let error;
        // Any 2xx status code signals a successful response but
        // here we're only checking for 200.
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            apiRes.resume();
            return;
        }

        apiRes.setEncoding('utf8');
        let rawData = ''; // stream in the data and hold it as a string
        apiRes.on('data', (chunk) => { rawData += chunk; });
        console.log(rawData)
        apiRes.on('end', () => {
            try {
                parsedData = JSON.parse(rawData);
                res.send({userInfo: parsedData});
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {console.error(`There was an error: ${e.message}`);});  
});

router.get('/solved', (req, res) => { //user solved problems
    const user = Object.values(req.query)[0] !== undefined ? decodeURIComponent(Object.values(req.query)[0]) : 'BVasquez07'; //grab the user from the query else just use my stats
    https.get(`https://alfa-leetcode-api.onrender.com/${user}/solved`, (apiRes) => {
        const { statusCode } = apiRes;
        const contentType = apiRes.headers['content-type'];

        let error;

        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            apiRes.resume();
            return;
        }

        apiRes.setEncoding('utf8');
        let rawData = ''; // stream in the data and hold it as a string
        apiRes.on('data', (chunk) => { rawData += chunk; });
        console.log(rawData)
        apiRes.on('end', () => {
            try {
                parsedData = JSON.parse(rawData);
                res.send({userSolved: parsedData});
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {console.error(`There was an error: ${e.message}`);});
    
})


router.get('/submission', (req, res) => { //user submissions
    const user = Object.values(req.query)[0] !== undefined ? decodeURIComponent(Object.values(req.query)[0]) : 'BVasquez07'; //grab the user from the query else just use my stats
    
    https.get(`https://alfa-leetcode-api.onrender.com/${user}/submission`, (apiRes) => {
        const { statusCode } = apiRes;
        const contentType = apiRes.headers['content-type'];

        let error;

        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            apiRes.resume();
            return;
        }

        apiRes.setEncoding('utf8');
        let rawData = '';
        apiRes.on('data', (chunk) => { rawData += chunk; });
        console.log(rawData)
        apiRes.on('end', () => {
            try {
                parsedData = JSON.parse(rawData);
                res.send({userSubmitted: parsedData});
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {console.error(`There was an error: ${e.message}`);});
});

module.exports = router;