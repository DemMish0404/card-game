import { Card, Deck } from "./deck.js";

const CARD_VALUE_MAP = {
   "2": 2,
   "3": 3,
   "4": 4,
   "5": 5,
   "6": 6,
   "7": 7,
   "8": 8,
   "9": 9,
   "10": 10,
   J: 11,
   Q: 12,
   K: 13,
   A: 14
 }

const computerHowManyCardsLeft = document.querySelector('.computer-how-many-cards-left')
const computerCurrentCard = document.querySelector('.computer-current-card')
const userHowManyCardsLeft = document.querySelector('.player-how-many-cards-left')
const playerCurrentCard = document.querySelector('.player-current-card')
const winLoseDrawText = document.querySelector('.lose-win-draw')



let computerDeck, userDeck, isRound

const deck = new Deck()
deck.shuffle()


console.log(deck.deck)

document.addEventListener('click',()=>{

   if(isRound) {
      clearTable()
      return
   } else if (userDeck.deck.length === 0 || computerDeck.deck.length ===0){
      startGame()
   } 
   else{
      flipCards()
   }


})

function startGame(){
   const middlePoint = Math.ceil(deck.deck.length / 2)
   computerDeck = new Deck(deck.deck.slice(0,middlePoint))
   userDeck = new Deck(deck.deck.slice(middlePoint, deck.deck.length))

   console.log('computer:', computerDeck)
   console.log('user:', userDeck)
   
   clearTable()
}

startGame()

function clearTable(){
   isRound= false
   computerCurrentCard.innerHTML = ''
   playerCurrentCard.innerHTML = ''
   MakeHtmlElementInvisibleAndViceVerca(computerCurrentCard,true) 
   MakeHtmlElementInvisibleAndViceVerca(playerCurrentCard,true)
   winLoseDrawText.textContent = ''
   displayHowManyCardsLeftOnBothSides()
}

function flipCards(){
   isRound=true
   const nextComputerCard = computerDeck.pop()
   console.log(nextComputerCard)
   computerCurrentCard.append(nextComputerCard.getHtml())
   const nextPlayerCard = userDeck.pop()
   playerCurrentCard.append(nextPlayerCard.getHtml())
   MakeHtmlElementInvisibleAndViceVerca(computerCurrentCard,false)
   MakeHtmlElementInvisibleAndViceVerca(playerCurrentCard,false)

   displayHowManyCardsLeftOnBothSides()


   if( ifWin(CARD_VALUE_MAP[nextPlayerCard.value] , CARD_VALUE_MAP[nextComputerCard.value])){
      winLoseDrawText.textContent = 'win'
      userDeck.push(nextPlayerCard)
      userDeck.push(nextComputerCard)
   }else if (ifWin(CARD_VALUE_MAP[nextComputerCard.value],CARD_VALUE_MAP[nextPlayerCard.value])){
      winLoseDrawText.textContent = 'lose'
      computerDeck.push(nextPlayerCard)
      computerDeck.push(nextComputerCard)
   }else{
      winLoseDrawText.textContent = 'draw'
      userDeck.push(nextPlayerCard)
      computerDeck.push(nextComputerCard)
   }


}

function ifWin(firstPlayer, secondPlayer){
   return firstPlayer > secondPlayer
}

function MakeHtmlElementInvisibleAndViceVerca(htmlEl, ifShouldBeHidden = true){
   htmlEl.style.opacity = ifShouldBeHidden ? '0' : '1'
}

function displayHowManyCardsLeftOnBothSides(){
   userHowManyCardsLeft.textContent = userDeck.deck.length
   computerHowManyCardsLeft.textContent = computerDeck.deck.length
}