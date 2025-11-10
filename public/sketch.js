


const pForm = document.querySelector('#poemForm');
//JAVASCRIPT HTML FORM LISTENERS
const myForm = document.getElementById('poemForm');
const myTextInput = document.getElementById('poemInput');
const outputParagraph = document.getElementById('output');

myForm.addEventListener('submit', function(event) {
	// Prevent the default form submission behavior (page reload)
	event.preventDefault();

	// Get the value of the text input field
	const inputValue = myTextInput.value;

	// // Display the retrieved value
    // freqState = createP('idle...');
    // freqState.class('You entered: ' + inputValue);
	// outputParagraph.textContent = 'You entered: ' + inputValue;
	

    const response = fetch('/bored', { // Your Node.js endpoint
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({"train": "Q", "poem": 'Textual content'})
    });






// 	server.post('/bored', (req, res) => {
// 		//whenever someone hits this with a post, do this
// 		//const {train, poem} = req.body; //destructure the name and animal from the request body
// 		const newItem= {id:musings.length+1, train:Q, poem:"added one"};
// 		//add it to the array
// 		musings.push(newItem);

// 		//201 indicates a successful post
// 		//REPLY TO THE CLIENT THAT'S CONNECTED
// 		res.status(201).json(newItem);

// });
});


const response = await fetch('/update-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ textInput: textInput })
                });
                const data = await response.json();
                document.getElementById('responseMessage').innerText = data.message + ' You sent: "' + data.receivedText + '"';