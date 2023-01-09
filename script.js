const tank = document.getElementById("tank");
const fish = document.getElementById("fish");
const stock1 = document.getElementById("stock-1");
const stock2 = document.getElementById("stock-2");

const apiKey = "cetkb7iad3i5jsal6q80cetkb7iad3i5jsal6q8g";

let start, previousTimeStamp, stock_1, stock_2;
let loading = false;
let stockOneScore = 0;
let stockTwoScore = 0;

maxX = tank.offsetWidth;
maxY = tank.offsetHeight;

//Getting starting position of fish
randomX = Math.floor(Math.random() * ((maxX + 1) - 25));
randomY = Math.floor(Math.random() * ((maxY + 1) - 25));

fish.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;

//Getting the two random stocks
fetchHandler();


//user presses space to start the fish
window.addEventListener("keyup", event => {
    if(event.code === 'Space' && !loading){
        hideStart(); 
        start = undefined;
        window.requestAnimationFrame(startFish); 
    }
}) 

 
/* Helper functions */

//function involved in fishes movements
function startFish(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }

  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    const randomDirection = Math.floor(Math.random() * 4);

    if(randomDirection == 0){
        randomX -= 10;
        if(randomX < 0){randomX = 0;}
        fish.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    }
    else if(randomDirection == 1){
        randomX += 10;
        if(randomX > maxX - 25){randomX = maxX - 25;}
        fish.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    }
    else if(randomDirection == 2){
        randomY -= 10;
        if(randomY < 0){randomY = 0;}
        fish.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    }
    else{
        randomY += 10;
        if(randomY > maxY - 25){randomY = maxY - 25;}
        fish.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    }

  }

  if(randomX < maxX / 2){
    stock1.style.color = "lime";
    stock2.style.color = "black";
    stockOneScore += 1;
    stock1.innerText = stock_1 + ` : ${Math.floor(stockOneScore / 60)}`;

  }
  else{ 
    stock1.style.color = "black";
    stock2.style.color = "lime";
    stockTwoScore += 1;
    stock2.innerText = stock_2 + ` : ${Math.floor(stockTwoScore / 60)}`;
  }
  

  if (elapsed < 3600000) {
    previousTimeStamp = timestamp;
    window.requestAnimationFrame(startFish);
  }
  else{
    stockOneScore > stockTwoScore ? (stock1.style.color = "yellow", stock2.style.color = "black") : (stock1.style.color = "black", stock2.style.color = "yellow")
  }
}

// Calls the API to get the two random stocks

function fetchHandler(){
  displayLoading();
  fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      data.sort(() => Math.random() - Math.random).slice(0, 2);
      stock_1 = data[0].symbol;
      stock_2 = data[1].symbol;
      stock1.innerText = stock_1;
      stock2.innerText = stock_2;
      hideLoading();
      displayStart();
    });
}


/* Functions that displays the loading and the start screen */

function displayLoading(){
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "grid";
  loading = true;
}

function hideLoading(){
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.style.display = "none";
  loading = false;
}


function displayStart(){
  const startScreen = document.getElementById("start-screen");
  startScreen.style.display = "grid";
}

function hideStart(){
  const startScreen = document.getElementById("start-screen");
  startScreen.style.display = "none";
}
