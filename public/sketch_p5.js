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
    
    //create name stuff section
    nameStuff = createDiv();
    nameStuff.id('nameStuff');
    nameStuff.position(10, 210);
    //nameStuff.child(nameField);
    nameStuff.child(submitButton);
}

function submit() {
    //text(nameField.value(),150,150);

    const poemText = document.getElementById('bigPoemBox');
    const trainText = document.getElementById('trainBox');
    //text(poemText.value,150,250);
    if(poemText.value==""){
      background(255); // to cover any previous text
      fill(214,0,25);
      textSize(15);
      text("Please write a poem to submit · ♡ · ♡ ·",22,50);
    }
    else{
      //its ok if the train text is empty 
      background(255); //  to cover any previous text
      fill(174,55,255);
      textSize(15);
      text("Poem received—thank you · ♡ · ♥︎ · ❤︎ · ♥︎ · 𖹭 · ",22,50);
      //empty the submit boxes so they can submit again if they want
      poemText.value = '';
      trainText.value = '';
      let dateFull = new Date();
      // nf is the same as casting as a string, but ensures each number has a specific # of digits
      let date= nf(month(),2)+nf(day(),2)+nf(year(),4); // current year
      print(date);
      let time = nf(hour(),2)+":"+nf(minute(),2);
      const response = fetch('/bored', { // Your Node.js endpoint
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
          //body: JSON.stringify({"train": poemText.value, "poem": nameField.value()})
          body: JSON.stringify({"date": date,"time":time,"train":  trainText.value, "poem": poemText.value})
      });


      const getter = fetch('/', { // Your Node.js endpoint
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
          //body: JSON.stringify({"train": poemText.value, "poem": nameField.value()})
          //body: JSON.stringify({"train":  nameField.value(), "poem": poemText.value})
          body: JSON.stringify({"date": date,"time":time,"train":  trainText.value, "poem": poemText.value})
      });
      print(getter);
      //getLocalData();
      //getAPIData();
  }
}

async function getLocalData() {
  const url = "http://localhost:13001/bored";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Fetched poems locally:', result);
  } catch (error) {
    console.error(error.message);
  }
}


async function getAPIData() {
  const url = "http://localhost:13001/random-poem";
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