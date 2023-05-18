/*  ****************** NOTES ****************  * /

The first article had a long synchronous task this was a single 
threaded program. A thread being a sequence of instructions 
that a program follows. Since it was single threaded it was only
able to do one thing at a time.

Workers allow a program to run various tasks in different threads.
They allow you to start a task, then continue with other processing.

Unfortunately, with multithreading code, it's hard to tell when the thread 
will be suspended and the other thread will run. If both threads have access 
to the same variables, it is possible for variables to change at any time 
causing hard to find bugs.

A way of avoiding this is to prevent you main code and your worker code from 
getting direct access to each others variables. They should work independently and 
only send each other messages.
** WORKERS can not access the DOM (the window, document, page elements, etc.)

There are three different workers 
- dedicated workers
- shared workers
- service workers

The first example in the documentation uses web workers to run the program from the 
first part.

*/
//Code from REPO Provided in DOC
//main.js

// Create a new worker, giving it the code in "generate.js"
const worker = new Worker("./generate.js");

// When the user clicks "Generate primes", send a message to the worker.
// The message command is "generate", and the message also contains "quota",
// which is the number of primes to generate.
document.querySelector("#generate").addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  worker.postMessage({
    command: "generate",
    quota,
  });
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data.
worker.addEventListener("message", (message) => {
  document.querySelector(
    "#output"
  ).textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value =
    'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});

/*  ****************** NOTES ****************  * /
IN THE ABOVE CODE

The first thing being done is a worker is created using the Worker() constructor.
A URL is passed with the worker script. When the worker is created it is executed.

Next, a click event handler is added to the generate prime button. This is done with
querySelector and an eventlistener (listening for clicks). Instead of performing 
function a message is sent to the worker. The message can take an argument, and the
example it is passing a JSON object containing two properties 

    - A command property that uses a string to identify the thing we want the 
    worker to do
    - A quota, which is the number of primes to generate in our case (how many times to
      run the function)

Then, we add a message event handler to the worker. This allows the worker to tell 
us when the task is complete, to then pass on the results (data).  Then, the handle
takes the data from the data property of the message, it writes it to the output element.
data is the same as quota.

Lastly, we implement the click event handler for the "Reload" button. 
Just like in the synchronous version.

*/

// Code that goes in generate.js

/*  ****************** NOTES ****************  */

// Listen for messages from the main thread.
// If the message command is "generate", call `generatePrimes()`
addEventListener("message", (message) => {
  if (message.data.command === "generate") {
    generatePrimes(message.data.quota);
  }
});

// Generate primes (very inefficiently)
function generatePrimes(quota) {
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }

  const primes = [];
  const maximum = 1000000;

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));
    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }

  // When we have finished, send a message to the main thread,
  // including the number of primes we generated.
  postMessage(primes.length);
}

/*  ****************** NOTES ****************  * /
Above script runs as soon as the main script creates workers.

The workers begin by listening for messages from the main script,
using the global eventlistener function. Within the message event handler, 
the data property of the event contains a copy of the argument passed from the main script.
If the main script passes the generate command, we call the generatePrimes() function.
The value of quota is passed from the message event.

*/

/*  ****************** NOTES ****************  * /
Shared workers can be shared by several different scripts running in different windows.
Service workers act like proxy servers, caching resources so that web applications 
can work when the user is offline. They're a key component of Progressive web Apps
*/
