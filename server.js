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
const port = process.env.PORT || 3000;
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const SHEET_ID = process.env.SHEET_ID;
const OAUTH= process.env.OAUTH;

const fs = require('node:fs');









const {google} = require('googleapis');
const auth = new google.auth.GoogleAuth({
    keyFile: 'google.json', 
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

//function to write to the google sheet
async function writeToSheet(values){
	console.log('where i should be 2');

  const sheet = google.sheets({version: 'v4', auth});
  const spreadsheetId = '1n42DwvYNrp1V7zX6BuTF80oZFlRtyEgtQCr3ewLP-7I';//'1n42DwvYNrp1V7zX6BuTF80oZFlRtyEgtQCr3ewLP-7I';
  const range = 'Sheet1!A1'; 
  const inputOption = 'USER_ENTERED';
  const resource = {values};
  try {
    const res = await sheet.spreadsheets.values.update({
      spreadsheetId,range, inputOption, resource
    })
    return res;
  }catch(error){
      console.error('the error is ', error);
  }
}

(async () => {
  const toWrite = await writeToSheet([['train','poem'],['A train', 'I have been poemed'],['Q train','poem in poem in poem in poem']]);
  console.log('where i should be');

})









//SERVER IS AN INSTANCE OF THE EXPRESS LIBRARY 


//DEFINE AN ARRAY OF OBJECTS

// fs.readFile('books.json', function(err, data) { 

//     if (err) throw err; 

//     const books = JSON.parse(data); 
//     console.log(books); 
// }); 

let musings = 
[
	{ id:1 , train: "A", poem: "boredom, boredom everywhere. locked into phones, no looking around"},
	{ id:2 , train:"A", poem: "I wanted to see the city. Instead, the city has seen me" },

];


//DEFINE A ROUTE FOR HTTP GET REQUESTS TO "/mycoolapi/pets"
server.get('/bored', (req, res) => {
	res.json(musings);
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


server.get('/poems', async (req, res) => {
    
  try {
    // Fetch all data from row 2 to the last row dynamically
    const range = `Sheet1!A1:A3`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
    //const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}?ranges=Sheet1!A1:F5&fields=sheets/data/rowData/values/userEnteredValue&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Sheet API Error:', data.error);
      return res.status(400).json({ error: data.error.message });
    }

	console.log('Fetched sheet data:', data);
    const rows = data.values || [];
    const numRows = 5;  // Your desired row count
    const numCols = 6;  // Your desired column count (A-F)

    // Fill in empty cells
    const filledRows = [];
    for (let i = 0; i < numRows; i++) {
      const row = rows[i] || [];
      const filledRow = [];
      for (let j = 0; j < numCols; j++) {
        filledRow.push(row[j] || '');
      }
      filledRows.push(filledRow);
    }
    
    res.json({ data: filledRows });
  } catch (error) {
    //console.error('Error fetching sheet:', error);
    res.status(500).json({ error: error.message });
  }
});







server.post('/bored', (req, res) => {
	//whenever someone hits this with a post, do this

	const {train, poem} = req.body; //destructure the name and animal from the request body
	const newItem= {id:musings.length+1, train, poem};
	//add it to the array
	musings.push(newItem);
	console.log('Received upd');
	
	let dataString=', '+JSON.stringify(newItem);
	fs.writeFile('data.txt', dataString,  { flag: 'a+' }, err => {
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

	const {train, poem} = req.body; 
	const newItem= {id:musings.length+1, train, poem};
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
server.listen(13001, () => {
	console.log("server running on port 13001");
	const toWrite =  writeToSheet([{'train':"A",'poem': 'I have been poemed'},{"train":'Q train',"poem":'poem in poem in poem in poem'}]);
  	console.log('where i should be');
});