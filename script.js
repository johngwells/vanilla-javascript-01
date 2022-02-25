// Get Quotes from API
let apiQuotes = [];
let randomQuote = [];

// Random new quote
function newQuote() {
  randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

async function getQuotes() {
  try {
    const response = await fetch('https://type.fit/api/quotes')
    apiQuotes = await response.json();

    newQuote();
  } catch(err) {
    console.error(err);
  }
}

// On Load
getQuotes();

const quote = document.getElementById('quote');
const author = document.getElementById('author');
const button = document.getElementById('new-quote');

button.addEventListener('click', () => {
  quote.innerText = randomQuote.text;
  author.innerText = randomQuote.author;
  newQuote()
});