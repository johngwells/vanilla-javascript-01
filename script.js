// Get Quotes from API
let apiQuotes = [];
let randomQuote = [];

const quoteContainer = document.getElementById('quote-container');
const twitter = document.getElementById('twitter');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const button = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const errorBtn = document.getElementById('error-button');

function showloadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function showError() {
  error.hidden = false;
  quoteContainer.hidden = true;
  errorBtn.hidden = false;
}

function removeError() {
  error.hidden = true;
  quoteContainer.hidden = true;
  errorBtn.hidden = true;
}

// Random new quote
function newQuote() {
  showloadingSpinner();
  randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (randomQuote.text.length > 50) {
    quote.classList.add('long-quote');
  } else {
    quote.classList.remove('long-quote');
  }
  quote.textContent = randomQuote.text;
  author.textContent = randomQuote.author;
  removeLoadingSpinner();
}

async function onLoad() {
  showloadingSpinner();
  try {
    const response = await fetch('https://type.fit/api/quotes');
    apiQuotes = await response.json();

    newQuote();
  } catch (err) {
    setTimeout(() => {
      removeLoadingSpinner();
      showError();
    }, 3000);
  }
}

onLoad();

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
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, '_blank');
}

twitter.addEventListener('click', () => {
  tweetQuote();
});

errorBtn.addEventListener('click', () => {
  removeError();
  onLoad();
});
