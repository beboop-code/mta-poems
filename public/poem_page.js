
async function setup() {
    const anotherPoemButton = document.getElementById('new-poem');
    anotherPoemButton.addEventListener('click', fetchNewPoem);

}
function fetchNewPoem() {
    
    // let num=random(0,100);
    // text(num,50,50);
    // noStroke();
    // fill(255);
    // rect(40,40,30,30);
    // fill(255,0,0);
    // text(num,50,50);
    const poemDisplay = document.getElementById('poemDisplay');
    fetch('/random-poem')
        .then(response => response.text())
        .then(data => {
            console.log(data);
            data = JSON.parse(data);
            const poemInHTML = document.getElementById("dynamicPoem");
            poemInHTML.innerHTML = data.poem;
            const trainInHTML = document.getElementById("dynamicTrain");
            if(data.train==''){
                trainInHTML.innerHTML = " an unknown";
            }
            else            
                trainInHTML.innerHTML = "the " + data.train;
        })
        .catch(error => {
            console.error('Error fetching poem:', error);
        });


}
// const getter = fetch('/random-poem', { // Your Node.js endpoint
//           method: 'GET',
//           headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json'
//               },
//           //body: JSON.stringify({"train": poemText.value, "poem": nameField.value()})
//           //body: JSON.stringify({"train":  nameField.value(), "poem": poemText.value})
//           body: JSON.stringify({"date": date,"time":time,"train":  trainText.value, "poem": poemText.value})
//       });