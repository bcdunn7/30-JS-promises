// **********************************************
// Part 1: Number Facts

const NUMBERS_URL = 'http://numbersapi.com/';

// 1
axios.get(`${NUMBERS_URL}7?json`).then(resp => console.log(resp.data.text))


// 2
div = document.getElementById('container')
axios
    .get(`${NUMBERS_URL}7..11?json`)
    .then(resp => {
        // div.append(resp.data)
        console.log(resp, resp.data)
        for (i in resp.data) {
            div.append(resp.data[i])
        }
    })
    .catch(err => console.log(err))


// 3
const fourNumberPromies = [];

for (let i=0; i < 5; i++) {
    fourNumberPromies.push(
        axios.get(`${NUMBERS_URL}7?json`)
    )
}

Promise.all(fourNumberPromies)
    .then(numbFacts => {
        console.log(numbFacts)
        numbFacts.forEach(fact => div.append(fact.data.text))
    })
    .catch(err => console.log(err))


// **********************************************
// Part 2: Deck of Cards

// 1 & 2
let firstCard;
axios
    .get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
    .then(resp => {
        firstCard = `${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`;
        return axios.get(`http://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
    })
    .then(resp => {
        let secondCard = `${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`;
        [firstCard, secondCard].forEach(card => console.log(card))
    })


// 3
let deckId = '';
window.addEventListener('DOMContentLoaded', function(){
    axios
        .get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(resp => {
            deckId = resp.data.deck_id;
        })
})

let btn = document.querySelector('#draw-card-btn')
let cardsDiv = document.querySelector('#cards')

btn.addEventListener('click', function() {
    axios
        .get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(resp => {
            cardsDiv.append(`${resp.data.cards[0].value} of ${resp.data.cards[0].suit}`)
        })
})