// include any libraries
const express = require('express');  // include the express library 
// declare any global variables:

const bodyParser = require('body-parser'); // include the body-parser library to help parse JSON data in requests
//THIS IS SAYING HEY SERVER, WHENEVER YOU RECIEVE A REQUEST, USE THE BODY-PARSER TO DEAL WITH IT
const server = express();			       // create a named server using express 
server.use(bodyParser.json()); // use the body-parser middleware to parse JSON data
 
const path = require('path');
server.use(express.static(path.join(__dirname, 'public')));

//API STUFF
const port = process.env.PORT || 13001;
require('dotenv').config();

const fs = require('node:fs');








//function to write to the google sheet
async function writeToSheet(values){
	console.log('where i should be 2');


}

(async () => {
  const toWrite = await writeToSheet([['train','poem'],['A train', 'I have been poemed'],['Q train','poem in poem in poem in poem']]);
  console.log('where i should be');

})




//SERVER IS AN INSTANCE OF THE EXPRESS LIBRARY 


let musings = 
[
	{ id:1 , train: "A", poem: "boredom, boredom everywhere. locked into phones, no looking around"},
	{ id:2 , train:"A", poem: "I wanted to see the city. Instead, the city has seen me" },

];


let vettedMusings = 
[
	{ id:1 , train: "A", poem: "boredom, boredom everywhere. locked into phones, no looking around"},
	{ id:2 , train:"A", poem: "I wanted to see the city. Instead, the city has seen me" },
	{ id:3 , train:"N", poem:"testing out\ntheories\nof change\nwith\nn\ne\nw\nl\ni\nn\ne\ns"},
	{ id:4 , train:"F", poem:"I can't write poems!"},
	{ id:5 , train:"1", poem:"Why won't the ads stop?\nI just want to read my book.\nIs that too much to ask?"},
	{ id:6 , train:"4", poem:"Like lilies in the park, we too bloom and fade"},
	{ id:7 , train:"R",poem:"This man\nThis jacket\nWay too loud\nWay too colorful\nWay too few pockets\nOf course hes reading \nOf course its in French\nOf course this is his stop\nIt would look better on me"}
];


//DEFINE A ROUTE FOR HTTP GET REQUESTS TO "/mycoolapi/pets"
server.get('/bored', (req, res) => {
	res.json(musings);
});

server.get('/hi', (req, res) => {
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("Hi there dear!");
	res.end();
});


server.get('/random-poem', (req, res) => {
	let randNum=Math.floor(Math.random()*(vettedMusings.length));
	randPoem=vettedMusings[randNum];
	// let randNum=Math.floor(Math.random()*(musings.length));
	// randPoem=musings[randNum];
	res.writeHead(200, {"Content-Type": "text/html"});
	let jsonp={poem:randPoem.poem, train: randPoem.train};
	res.write(JSON.stringify(jsonp));
	res.end();

});

// define what to do when the client requests something:
// Define a route for HTTP GET requests to the root URL ('/')
//EXPRESS COMES WITH A METHOD CALLED GET
// / IS THE ROOT OF THE DOMAIN - IE MTCOOLWEBSITE.COM/  AND THIS IS THAT /
server.get('/', (req, res) => {
	// print a message on the command line
	console.log("got a request"); 
	// respond to the client
	// 200 IS THE HTTP RESPONSE CODE MEANING EVERYTHING IS OK
	// THE THING AFTERWARD IS A JSON KEY:VALUE PAIR WHICH WE CAN TELL BECAUSE THERE ARE CURLY BRACKETS
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("Hi there dear!");
	res.end();
});




server.post('/bored', (req, res) => {
	//whenever someone hits this with a post, do this

	const {date,time, train, poem} = req.body; //destructure the data from the request body
	const newItem= {id:musings.length+1, date, time, train, poem};
	//add it to the array
	musings.push(newItem);
	console.log('Received upd');
	console.log(newItem);
	sendDiscordMessage(JSON.stringify(newItem));
	let dataString=',\n'+JSON.stringify(newItem);
	fs.writeFile('prevetted-data.txt', dataString,  { flag: 'a+' }, err => {
	if (err) {
		console.error(err);
	} else {
		// file written successfully
	}
	});
	//201 indicates a successful post
	//REPLY TO THE CLIENT THAT'S CONNECTED
	res.status(201).json(newItem);

});


server.post('/poems', (req, res) => {
	//whenever someone hits this with a post, do this

	const {date, time, train, poem} = req.body; 
	const newItem= {id:musings.length+1, date, time, train, poem};
	//add it to the array
	musings.push(newItem);
	console.log('Received upd');

	//201 indicates a successful post
	//REPLY TO THE CLIENT THAT'S CONNECTED
	res.status(201).json(newItem);

});

// Start the server on port 13001 and log a message to the console
// EXPRESS STARTS A SERVER AND LISTENS FOR ANY CLINET CONNECTIONS
//PORTS ARE AKIN TO APTS INSIDE OF A BUILDING
//COMPUTERS HAVE AN IP ADDRESS THAT S A NUMERICAL STRING ASSIGNED TO THE COMPUTER BY THE NETWORK THAT YOU'RE ON
// PORTS ABOVE 2000 ARE GENERALLY OPEN FOR PEOPLE TO USE
// 13001 IS OFTEN USED FOR TESTING APPLICATIONS
server.listen(port, () => {
	console.log("server running on port 13001");
	const toWrite =  writeToSheet([{'train':"A",'poem': 'I have been poemed'},{"train":'Q train',"poem":'poem in poem in poem in poem'}]);
  	console.log('where i should be');
});

const webhookURL = 'https://discord.com/api/webhooks/1443078561010417714/tLnkmXQE4fSwQPlLvnQdoNNCgDgzgCnCN1-l521Gac56rQV_2LTOM1jmopyPP2FYKs3y';

async function sendDiscordMessage(messageContent) {
    try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: messageContent,
                username: 'ServerBot', // Optional
            }),
        });

        if (!response.ok) {
            console.error('Error sending message:', response.status, response.statusText);
        } else {
            console.log('Message sent successfully!');
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

