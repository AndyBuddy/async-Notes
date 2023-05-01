/*  ****************** NOTES ****************  * /
When you are implementing a promise-based API, you will be wrapping
an asynchronous operation. This async operation might use events, 
plain callbacks, or a message passing model.

We will be implementing an alarm() API
(promise-based alarm API called alarm())
It takes the name of the person to alarm as an argument. And a delay?
After the delay a "wake up!" message that includes the persons name will appear.


*/

//creates variable for id:output (div)
// const output = document.querySelector('#output');
// //creates variable for id:set-alarm (button)
// const button = document.querySelector('#set-alarm');

// function setAlarm() {
//   setTimeout(() => {
//     output.textContent = 'Wake up!';
//   }, 1000);
// }

// button.addEventListener('click', setAlarm);

/*  ****************** NOTES ****************  * /
The alarm function above returns a promise that is fulfilled when the timer expires.

Key component is the promise() constructor. The promise constructor takes a single
function as an argument. THis function is called the executor. When a new 
promise is created you supply the implementation of the executor.

The executor takes two arguments, both also functions, resolve and reject. In the executor 
implementation, you call the underlying asynchronous function. If the async function succeeds,
you call resolve, if fails, you call reject. If the executor throws an error, reject is called.
a single parameter of any type can be passed into resolve and reject. 

*/

// function alarm(person, delay) {
//     return new Promise((resolve, reject) => {
//       if (delay < 0) {
//         throw new Error('Alarm delay must not be negative');
//       }
//       setTimeout(() => {
//         resolve(`Wake up, ${person}!`);
//       }, delay);
//     });
//   }

/*  ****************** NOTES ****************  * /
The function above creates and returns a new promise. Inside the executor for the 
promise:

  - The delay is checked to not be negative, an error is then thrown if it is.
  - setTimeout is called, passing a callback adn delay. The callback will be called 
  when the timer expires, and in the callback we call resolve, passing the "wake up"
  message.


USING THE alarm() API


*/
// //Promise

// const name = document.querySelector('#name');
// const delay = document.querySelector('#delay');
// const button = document.querySelector('#set-alarm');
// const output = document.querySelector('#output');

// function alarm(person, delay) {
//   return new Promise((resolve, reject) => {
//     if (delay < 0) {
//       throw new Error('Alarm delay must not be negative');
//     }
//     setTimeout(() => {
//       resolve(`Wake up, ${person}!`);
//     }, delay);
//   });
// }

// button.addEventListener('click', () => {
//   alarm(name.value, delay.value)
//     .then((message) => output.textContent = message)
//     .catch((error) => output.textContent = `Couldn't set alarm: ${error}`);
// });

//Async and await

const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});