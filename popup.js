document.getElementById('clear-text').addEventListener('click', () => {
 document.getElementById('user-text').value = '';
});


// Add event listener for 'clear-output' button
document.getElementById('clear-output').addEventListener('click', () => {
 localStorage.setItem('lastOutput', document.getElementById('output').textContent);
 document.getElementById('output').textContent = '';
});

// Add event listener for 'restore-output' button
document.getElementById('restore-output').addEventListener('click', () => {
 var lastOutput = localStorage.getItem('lastOutput');
 if (lastOutput) {
   document.getElementById('output').textContent = lastOutput;
 }
});



// Clear and Restore API Key
document.getElementById('clear-api').addEventListener('click', () => {
  localStorage.setItem('lastApiKey', document.getElementById('api-key').value);
  document.getElementById('api-key').value = '';
});

document.getElementById('restore-api').addEventListener('click', () => {
  var lastApiKey = localStorage.getItem('lastApiKey');
  if (lastApiKey) {
    document.getElementById('api-key').value = lastApiKey;
  }
});
 




document.getElementById('send').addEventListener('click', async () => {
 const apiKey = document.getElementById('api-key').value;
 const userText = document.getElementById('user-text').value;
 const output = document.getElementById('output');
 lastOutput = '';

 output.textContent = "processing"; 

 // Make the API call using the fetch function.
 const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(
		{ 
			"model": "gpt-3.5-turbo",
			"messages": 
				[
					{"role": "system", "content": "You are a helpful assistant."},
					{"role": "user",   "content": userText},
				],
			"max_tokens": 1000
			
		}
	)
 });
	


// Extract the JSON from the response
const data = await response.json();

output.textContent = "response received";

// Safely access the message content
try{
if (data.error) 
	{
      // Display the error message
	  output.textContent = "error response received";
      output.textContent = data.error.message.trim();
    } 
else 
	{
      // Process and display the successful response
      let messageContent = '';
      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
			messageContent = data.choices[0].message.content;
		}
      output.textContent = messageContent;
    }
}
catch (error) {
    // Display fetch errors
    output.textContent = `Error: ${error.message.trim()}`;
  }
});