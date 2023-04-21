
//Calling the fetch() API (getting the data from a site) and attaching it to
//a variable.
//const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// console.log(fetchPromise);

// fetchPromise.then((response) => {
//   console.log(`Received response: ${response.status}`);
// });

// console.log("Started request…");



// fetchPromise.then((response) => {
//   const jsonPromise = response.json();
//   jsonPromise.then((data) => {
//     console.log(data[11].name);
//   });
// });

//BOTH TOP AND BOTTOM CODES ARE THE SAME

// fetchPromise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0].name);
//   });

// fetchPromise
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   });

//const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

//Is this code bellow better than the code above at catching errors? How so?
//I've tried removing the if statement that catches errors as well but the 
//promise did not work.
// fetchPromise
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   })
//   .catch((error) => {
//     console.error(`Could not get products: ${error}`);
//     //"could not get products: TypeError: Failed to fetch"
//   });

// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((responses) => {
//     for (const response of responses) {
//       console.log(`${response.url}: ${response.status}`);
//     }
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`)
//   });

//const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
//const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
//const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((response) => {
//     console.log(`${response.url}: ${response.status}`);
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`)
//   });


//In the code below we are calling await fetch(). Caller gets a complete response obj
//this would happen if fetch() were a synchronous function as well.
//We use try... catch block for error handling, just like we would if the code were 
//synchronous

async function fetchProducts() {
  try {
    //After line, out function will wait for `fetch()` call to be settled
    //The fetch() call will return a response or throw an error
    const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    //After this line, our function will wait for the `response.json()` call to be settled.
    //the response.json() call will either return the parsed JSON obj or throw an err
    const data = await response.json();
    console.log(data[0].name)
  }
  catch (error) {
    console.log(`Could not get products: ${error}`)
  }
}

fetchProducts();


//********* NOTES  *************//
/* 
A Promise is an object returned by an asynchronous function,
that represents the current state of operation.

When a promise is returned, the operation occurring is not always complete.
The promise provides the methods to handle the success or failure of the operation.

These are HTTP requests in this tutorial, they are sending a request to a remote 
server, and then sending us back a response.

Chaining promises

Once you get a response object, you call another function to get the response
data.

Catching errors

Error can be handled with catch() method. Handler passes then() when async
operation succeeds, and catch() when the async operation fails.
Adding catch() to the end of a promise chain will call it when any of the 
async functions fail.

Promise terminology

A promise can be in one of three states:
Pending, fulfilled, and rejected

When pending: the promise has been created and has neither succeeded or failed.
The state it is in when it's returned from a call to fetch(), and req is still
being made

When fulfilled: the async function has succeeded, when this happens the then()
handler is called.

When rejected: the async function has failed, when this happens the catch()
handler is called.

*** "succeeded" or "failed" meanings depend on the API. ex: fetch() can
consider a 404 Not Found error to be successful because the server returned it.
But unsuccessful if the network prevents a req being sent.

Combining multiple promises

Promise chain is needed when task consists of several async functions, 
and need each to complete before starting the next. (Wouldn't that be synchronously?)

When you need all the promises to be fulfilled, but they don't depend on
each other. It is more efficient to start them at the same time and then
get notified that they have been fulfilled. The promise.all() method is used.
The promise.all() method takes in an array of promises and returns a single promise.

This method is fulfilled when and if all the promises within the array
are fulfilled. Like it usually done, the then() handler is called with an array 
of all the responses in the same order they were passed into the method.

It is rejected if any of the promises are rejected. If this happens the catch() 
handler is called with the error thrown by the promise that is rejected.

Promise.any()

If you need any one of a set of promises to be fulfilled you can use promise.any()
It is fulfilled as soon as any of the array or promises is fulfilled, or rejected 
if all are rejected.
In this case it is unpredictable as to which case will be fetched.

Async and await

async keyword gives you a simpler way to work with async promise based code.
Adding async at the start of a function makes it an async function

Within an async function you can use the await keyword before a call to a
function that returns a promise. The code will wait at that point until the 
promise is settled. The fulfilled value is treated as a return value or 
the rejected value is thrown.

using these async and await keywords will allow you to write code that uses async 
functions but looks like synchronous code. 

*** Using await is only allowed in an async function, unless the code is in a JS module.

*/





