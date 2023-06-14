const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorName = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Pick a random quote from api
function pickQuote(){
    
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() *apiQuotes.length)];

// Checking if author field is null
    if(!quote.author){
        authorName.textContent = 'Unknown';
    }else{
        authorName.textContent = quote.author;
    }
        
// Set quote and hide loader    
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
    
}
// Get quotes form API
async function getQuotes(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        pickQuote();
    } catch (error) {
        
    } 
}

// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click',pickQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();

