// deck of cards library

// deck class for shuffling, dealing
export class Deck {
	constructor() {
		this.deck = []
		this.dealt_cards = []
	}

	// generates a deck of cards
	 generate_deck (Difficulty) {

		let shapes = ['oval', 'squiggle', 'diamond']
        let colors = ['red', 'green', 'purple']
		let numbers = ['one','two','three']
		let shadings = ['solid','striped','outlined']

		// creates card generator function
		let card = (shape,color,number,shading) => {
			let name = 'Shape :' + shape + ';Color :' + color +';Number :'+number +';Shade :'+shading;
		//returns key and values into each instance of the this.deck array
			return {'name': name, 'shape': shape, 'color':color,'number':number,'shading':shading}
		}

		if(Difficulty==="Advanced"){
		for ( let s = 0; s < shapes.length; s++ ) {
		        for ( let c = 0; c < colors.length; c++ ) {
                    for ( let n = 0; n < numbers.length; n++ ) {
                        for ( let i = 0; i < shadings.length; i++ ) {
               			this.deck.push(card(shapes[s], colors[c],numbers[n],shadings[i]))
        		}
		}
    }
    }
}
else{
for ( let s = 0; s < shapes.length; s++ ) {
		for ( let c = 0; c < colors.length; c++ ) {
			for ( let n = 0; n < numbers.length; n++ ) {	
				   this.deck.push(card(shapes[s], colors[c],numbers[n],'solid'));

}
}
}
}
}
	// prints the deck of card objects
	print_deck () {
		if (this.deck.length === 0) {
			console.log('Deck has not been generated. Call generate_deck() on deck object before continuing.')
		}
		else {
			for ( let c = 0; c < this.deck.length; c++ ) {
	       			console.log(this.deck[c])
			}
		}
	}

	// shuffle the deck
	shuffle () {
  		for( let c = this.deck.length -1; c >= 0; c--){
            		let tempval = this.deck[c];
            		let randomindex = Math.floor(Math.random() * this.deck.length);
			
			//ensures that the randome index isn't the same as the current index. It runs the function again if this returns as true
            			while(randomindex == c){ randomindex = Math.floor(Math.random() * this.deck.length)}
            		this.deck[c] = this.deck[randomindex];
            		this.deck[randomindex] = tempval;
        	}
	}

	// deal a number cards
	deal (num_cards) {

                let cards = []

                for ( let c = 0; c < num_cards; c++ ) {
                        let dealt_card = this.deck.shift()
                        cards.push(dealt_card)
                        this.dealt_cards.push(dealt_card)
                }

                return cards
        }

	replace () {
		this.deck.unshift(this.dealt_cards.shift())
	}

	clear_deck () {
		this.deck = []
	}
	get_length(){
		return this.deck.length;
	}
}
