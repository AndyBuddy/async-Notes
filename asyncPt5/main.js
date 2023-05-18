//my basic approach using async await to do the animation
//It even makes them resize back to normal.

const aliceTumbling = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const reverseTumbling = [
  { transform: "rotate(360deg) scale(0)" },
  { transform: "rotate(0) scale(1)" },
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: "forwards",
};

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// alice1.animate(aliceTumbling, aliceTiming);
// alice2.animate(aliceTumbling, aliceTiming);
// alice3.animate(aliceTumbling, aliceTiming);

//adds a delay function
function setDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animate1() {
  alice1.animate(aliceTumbling, aliceTiming);

  await setDelay(2000);
}

async function animate2() {
  alice2.animate(aliceTumbling, aliceTiming);

  await setDelay(2000);
}

async function animate3() {
  alice3.animate(aliceTumbling, aliceTiming);

  await setDelay(2000);
}

async function reverse1() {
  alice3.animate(reverseTumbling, aliceTiming);

  await setDelay(2000);
}

async function reverse2() {
  alice2.animate(reverseTumbling, aliceTiming);

  await setDelay(2000);
}

async function reverse3() {
  alice1.animate(reverseTumbling, aliceTiming);
}

async function animateAll() {
  await animate1();
  await animate2();
  await animate3();
  await reverse1();
  await reverse2();
  reverse3();
}

animateAll();
