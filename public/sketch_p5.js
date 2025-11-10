

// function sendFreq(){
//     const data = [nameField.value(), freqInput.value()]
//     socket.emit("frequency", data);
//     console.log(data);
// }

// socket.on('freqResponse', (data) => {
//     console.log(data);
//     freqState.html(data[0] + " changed the frequency to " + data[1]);
//     oscillator.freq(data[1], 0.250);
// });

// //log new users as they come into the room
// socket.on('response', (data) => {
//     console.log(data);
//     freqState.html(data + " joined the room");
// });

// socket.on('trigger', (data) => {
//     console.log(data[0]);
//     console.log(data[1]); 
// });

// function submit() {
//     socket.emit("name", nameField.value());
//     freqState.html('idle...');
//     oscillator.start();
//     playing = true;
// }


async function setup() {
    createCanvas(400, 400);
    background(255);
    noStroke();
    //create name field and button
    //create instruction text

    const poemText = document.getElementById('bigPoemBox');
    let textValue = poemText.value;
    const trainText = document.getElementById('trainBox');
    let trainValue = trainText.value;
    const myButton = document.getElementById('myButton');
    myButton.addEventListener('click', submit);
    




    // instruction = createP('enter your handle to begin');
    // instruction.id('instruction');
    // instruction.position(10, 170);
    // nameField = createInput();
    // nameField.id('name');
    // nameField.attribute('placeholder', 'what train are you on?');
    // nameField.position(10, 10);
    // submitButton = createButton('submit my poem');
    // submitButton.id('submit');
    // //submitButton.position(nameField.x + nameField.width + 10, 10);
    // submitButton.position(286, 245);
    // submitButton.mousePressed(submit);
 

 
    // buttonEl = createButton('stop');
    // //buttonEl.mousePressed(play);
    // buttonEl.id('buttonText');
    // buttonEl.position(10, 90);
 

    //create name stuff section
    nameStuff = createDiv();
    nameStuff.id('nameStuff');
    nameStuff.position(10, 210);
    //nameStuff.child(nameField);
    nameStuff.child(submitButton);
 
    // //create title
    // title = createElement('h1', 'frequency links');
    // title.position(10, -10);
    // title.class('title');
    // //create subtitle
    // subtitle = createElement('p', 'a multi-person audio work');
    // subtitle.position(10, 25);
    // subtitle.class('subtitle');
}

function submit() {
    //text(nameField.value(),150,150);

    const poemText = document.getElementById('bigPoemBox');
    const trainText = document.getElementById('trainBox');
    //text(poemText.value,150,250);
    fill(174,55,255);
    textSize(15);
    text("Poem received—thank you · ♡ · ♥︎ · ❤︎ · ♥︎ · 𖹭 · ",22,50);

    const response = fetch('/bored', { // Your Node.js endpoint
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        //body: JSON.stringify({"train": poemText.value, "poem": nameField.value()})
        body: JSON.stringify({"train":  trainText.value, "poem": poemText.value})
    });


    const getter = fetch('/', { // Your Node.js endpoint
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        //body: JSON.stringify({"train": poemText.value, "poem": nameField.value()})
        //body: JSON.stringify({"train":  nameField.value(), "poem": poemText.value})
        body: JSON.stringify({"train":  trainText.value, "poem": poemText.value})
    });

    getLocalData();
    getAPIData();
}

async function getLocalData() {
  const url = "http://localhost:13001/bored";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetched checkboxes locally:', result);
  } catch (error) {
    console.error(error.message);
  }
}


async function getAPIData() {
  const url = "http://localhost:13001/poems";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetched checkboxes from the internet:', result);
  } catch (error) {
    console.error(error.message);
  }
}