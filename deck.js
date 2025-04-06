const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ['A','2','3','4','5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ]


export class Deck{
   
   constructor(deck = freshDeck()){
      this.deck = deck
   }

   shuffle () {
      //случайным образом перезаписываем колоду карт (размешиваем ее)
      for ( let index = this.deck.length - 1 ; index > 0 ; index-- ){
         const randomIndex = Math.floor(Math.random() * index )
         console.log(randomIndex)
         const randomIndexValue = this.deck[randomIndex]

         this.deck[randomIndex] = this.deck[index]
         this.deck[index] = randomIndexValue
      }
   }

   pop(){
      //убирает из массива первый элемент и возвращает его нам 
      return this.deck.shift()
   }

   push(card){
      this.deck.push(card)
   }

}


export class Card{
   constructor(suit,value){
      this.suit = suit
      this.value = value
   }

   get color(){
      return this.suit === '♦' || this.suit === '♥' ? 'red-color' : 'black-color'
   }

   getHtml(){
      const cardEl = document.createElement('div')
      cardEl.textContent = this.suit
      cardEl.classList.add('current-card', this.color)
      cardEl.dataset.cardValue = `${this.value} ${this.suit}`
      return cardEl
   }



}


function freshDeck(){
   return SUITS.flatMap((suit, index)=> {
      return VALUES.map((value,index)=> new Card(suit,value))
   })
}

