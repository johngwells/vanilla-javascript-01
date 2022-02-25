// Get Quotes from API
let apiQuotes = [];
let randomQuote = [];

const twitter = document.getElementById('twitter');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const button = document.getElementById('new-quote');

// Random new quote
function newQuote() {
  randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (randomQuote.text.length > 50) {
    quote.classList.add('long-quote');
  } else {
    quote.classList.remove('long-quote');
  }
  quote.textContent = randomQuote.text;
}

async function getQuotes() {
  try {
    const response = await fetch('https://type.fit/api/quotes');
    apiQuotes = await response.json();

    newQuote();
  } catch (err) {
    console.error(err);
  }
}

// On Load
getQuotes();

button.addEventListener('click', () => {
  quote.innerText = randomQuote.text;
  if (!randomQuote.author) {
    author.textContent = 'Unknown';
  } else {
    author.textContent = randomQuote.author;
  }
  newQuote();
});

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`
  window.open(twitterUrl, '_blank');
}

twitter.addEventListener('click', () => {
  tweetQuote();
});
