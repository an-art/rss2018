(function(Game) {
	
	let gameBoard = document.querySelector('.game-board');
	let levelSelection = document.querySelector('.level').valueOf();
	let coverSelection = document.querySelector('.cover').valueOf();
	let board;
	let cover;
	let clocktimer;
	let	startDate;
	let readout=''; 
	let	init=0;

	let handleButtonStart = function (event) {
		event.preventDefault();
		document.querySelector('.rules').classList.add('hidden');
		gameBoard.classList.remove('hidden');
		document.querySelector('.game-end-section').classList.add('hidden');

		let boardValues = board.split('x');
		let cards = Game.initialize(Number(boardValues[1]), Number(boardValues[0]));
		buildBoard(Game.cards, Game.board.rows, Game.board.cols);
		StartStopwatch();		
	};
	document.querySelector('.start-button').addEventListener('click', handleButtonStart);

	let handleLevelSelection  = function (event) {
		event.preventDefault();
		board = levelSelection.options[levelSelection.selectedIndex].value;		
	};
	levelSelection.addEventListener('click', handleLevelSelection);

	let handleCoverSelection = function (event) {
		event.preventDefault();
		cover = coverSelection.options[coverSelection.selectedIndex].value;
	};
	coverSelection.addEventListener('click', handleCoverSelection);

	let buildBoard = function (cards, rows, cols) {
		let index = 0;

		while (gameBoard.firstChild) {
			gameBoard.firstChild.removeEventListener('click', flipCard);
			gameBoard.removeChild(gameBoard.firstChild);
		}

		for (let i = 0; i < rows; i++) {
      		for (let j = 0; j < cols; j++) {
      			gameBoard.appendChild(buildCard(index, cards[index].value, cards[index].isRevealed));
      			index++;
      		}
      	}

      	gameBoard.style.width = cols * 160 + 'px';
      	gameBoard.style.height = rows * 200 + 'px';
	};

	let buildCard = function (index, value, isRevealed) {
		let flipContainer = document.createElement('div');
		let front = document.createElement('a');
		let back = document.createElement('a');
		flipContainer.index = index;
		flipContainer.classList.add('flip-container');

		if (isRevealed) {
			flipContainer.classList.add('clicked');
		}

		front.classList.add("front");
	    front.setAttribute("href", "#");
	    front.setAttribute("draggable", "false");
	    front.style.backgroundImage = "url(images/" + cover + "-cover.png)"
	    back.classList.add("back");
	    back.classList.add("card-" + cover + "-" + value);
	    back.setAttribute("href", "#");
	    back.setAttribute("draggable", "false");
	    flipContainer.appendChild(front);
	    flipContainer.appendChild(back);
	    flipContainer.addEventListener('click', flipCard);
	    
	    return flipContainer;
	};
	
	let flipCard = function (event) {
		event.preventDefault();
		let status = Game.play(this.index);
		console.log(status);

		if (status.code != 0) {
			this.classList.toggle('clicked');
		}
		if (status.code == 3) {
			setTimeout(function () {
				let childNodes = gameBoard.childNodes;
				childNodes[status.args[0]].classList.remove('clicked');
				childNodes[status.args[1]].classList.remove('clicked');
			}.bind(status), 700);
		} else if (status.code == 2 || status.code == 4) {
				let revealedCards = document.querySelectorAll('.clicked');
				let i = revealedCards.length-1;
				while (i >= 0) {
					revealedCards[i].classList.add('disappear');
					i--;
				}
		}
		if (status.code == 4) {
			document.querySelector('.game-end-congrats').innerHTML = "Congratulations! You've won the game in " + Game.attempts + " moves!</br>Your time is " + readout;
			ClearClock();
			document.querySelector('.game-end-section').classList.remove('hidden');
		}
	};

	let ClearClock = function () { 
		clearTimeout(clocktimer); 	 
		init = 0;
		readout = '00:00:00'; 
		document.StopWatchForm.stopwatch.value = readout; 
	}; 

	let StartStopwatch = function () { 
			ClearClock();
			startDate = new Date(); 
			StartTime();
			init = 1; 
	}; 

	let StartTime = function () { 
		let thisDate = new Date();
		let time = thisDate.getTime() - startDate.getTime();
		let ms = time % 1000; 
		time -= ms; 
		time = Math.floor(time / 1000);
		let sec = time % 60; 
		time -= sec;
		time = Math.floor(time / 60);
		let min = time % 60; 
		time -= min;
		time = Math.floor(time / 60);
		let hour = time % 60;
		if (hour < 10) hour = '0' + hour;
		if (min < 10) min = '0' + min;
		if (sec < 10) sec = '0' + sec;
		if (init == 1) {
		readout = hour + ':' + min + ':' + sec; 
		document.StopWatchForm.stopwatch.value = readout; }
		clocktimer = setTimeout(StartTime, 1); 
	}; 

})(Game);
