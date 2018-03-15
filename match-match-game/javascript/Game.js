let Game = {
	board: {
		rows: 2,
		cols: 3
	},
	cards: [],
	attempts: 0,
	isGameOver: false,
	initialize: function(rows, cols) {
		this.board.rows = rows;
		this.board.cols = cols;
		this.attempts = 0;
		this.isGameOver = false;
		this.createCards().shuffleCards();
	},
	createCards: function() {
		let cards = [];
		let count = 0;
		let maxCards = (this.board.rows * this.board.cols) / 2;
		while (count < maxCards) {
			cards[2 * count] = new this.Card(count + 1);
			cards[2 * count + 1] = new this.Card(count + 1);
			count++;
		}
		this.cards = cards;
		return this;
	},
	shuffleCards: function() {
		let cards = this.cards;
		let shuffled = [];
		let index = 0;
		while (shuffled.length < cards.length) {
			index = Math.floor(Math.random() * cards.length);
			if (cards[index]) {
				shuffled.push(cards[index]);
				cards[index] = null;
			}
		}
		this.cards = shuffled;
		return this;
	},
	play: (function () {
		let cardSelection = [];
	    let revealedCards = 0;
	    let revealedValues = [];

	    return function(index) {
	    	let status = {};
	    	let value = this.cards[index].value;

	    	if (!this.cards[index].isRevealed) {
	    		this.cards[index].reveal();
	    		cardSelection.push(index);
	    		if (cardSelection.length == 2) {
	    			this.attempts++;
	    			if (this.cards[cardSelection[0]].value != this.cards[cardSelection[1]].value) {
	    				this.cards[cardSelection[0]].conceal();
	    				this.cards[cardSelection[1]].conceal();
	    				revealedValues.push(this.cards[cardSelection[0]].value);

			            status.code = 3,
			            status.args = cardSelection;
	    			} else {
	    				revealedCards += 2;
	    				if (revealedCards == this.cards.length) {
	    					this.isGameOver = true;
							revealedCards = 0;
							revealedValues = [];
							status.code = 4;
	    				} else {
	    					status.code = 2;
	    				}
	    			}
	    			cardSelection = [];
	    		} else {
	    			status.code = 1;
	    		}
	    	} else {
	    		status.code = 0;
	    	}
	    	return status;
	    };
	})()
};