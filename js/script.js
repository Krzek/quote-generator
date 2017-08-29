const URL = 'https://api.myjson.com/bins/ni3gl';
const htmlAuthor = document.getElementById('author');
const htmlQuote = document.getElementById('quote');
let randomInt = 0;
let lastRandomInt = 0;
let theAuthor;
let theQuote;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomInt = Math.floor(Math.random() * (max - min)) + min;
    if (randomInt == lastRandomInt) {
        console.log('RANDOM INT = ', randomInt);
        console.log('LAST RANDOM INT = ', lastRandomInt);
        randomInt++;
        console.log('RANDOM INT UPDATED = ', randomInt);
        if (randomInt == 9) {
            console.log('RANDOM INT == 9');
            randomInt = 0;
        }
    }
    lastRandomInt = randomInt;
    return randomInt;
}

function generateQuote() {
    fetch(URL, {
        method: 'GET'
    })
        .then(
        (response) => {
            return response.json();
        })
        .then(
        (data) => {
            let quoteObject = data[getRandomInt(0, data.length)];
            let author = quoteObject.attrib;
            let quote = quoteObject.quote;
            this.theAuthor = author;
            this.theQuote = quote;
            htmlAuthor.innerHTML = `<p>- ${author}</p>`;
            htmlQuote.innerHTML = `<p><i class="fa fa-quote-left"></i> <span class="quote__span">${quote}</span> <i class="fa fa-quote-right"></i></p>`;
            console.log('Author: ', author);
            console.log('Quote: ', quote);
        })
        .catch(function (err) {
            console.error(err);
        });
}

function tweetIt() {
    let quoteToTweet = `"${this.theQuote}" - ${this.theAuthor}`;
    let twitter = document.getElementById('twitter').setAttribute('href','https://twitter.com/intent/tweet?text='+encodeURIComponent(quoteToTweet));
}
