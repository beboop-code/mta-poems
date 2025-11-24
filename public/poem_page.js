
async function setup() {
    const anotherPoemButton = document.getElementById('new-poem');
    anotherPoemButton.addEventListener('click', fetchNewPoem);

}
function fetchNewPoem() {
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
