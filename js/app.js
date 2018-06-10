$( document ).ready(function() {
	var timer = 0, move = 0, win = 0, cards = [], deck = [], i = 0;

	// initialize clock
	var clock = setInterval( function() {
		if( win >= 8 ) {
			clearInterval(clock);
		}
        $('.time').text(timer);
        timer++;
	}, 1000 );

	// pop deck
	$(".card").each(function(i, card) {
		deck.push(card.children[0].className);
	});

	// shuffle
	deck = shuffle(deck);
	$(".card").each(function(i, card) {
		card.children[0].className = deck[i];
	});

	// card click
	$(".card").each(function(i, el) {
		el.addEventListener('click', function(ev){
			if(el.className !== 'card open show' && el.className !== 'card match') {
                displayCard(ev);
                cards.push(el);
                compare();
                score();
                winner();
            }
		});
	});

	// hide cards
	setTimeout(function() {
		$('li').removeClass('open show');	
	}, 5000);

	// restart game
	$(".restart").each(function(i, el) {
		el.children[0].addEventListener('click', function() {
			document.location.reload(true);
		});
	});

	function displayCard(evt) {
		$(evt.target).addClass('open show');
	}

	function compare() {
		if(cards.length === 2) {
			var prv, cur = null;
			cards.forEach(function(card, i) {
				cur = card.children[0].className;
				if(prv !== null && i === 1) {
					if( prv === cur ) {
						match();
						moves();
					  } else {
							setTimeout(function(){
								unmatch();
								moves();
							}, 500);
					  }
				}
				prv = cur;
			});
		}
	}

	function match() {
	   cards.forEach(function(card, i) {
		   $(card).removeClass('open show');
		   $(card).addClass('match');
		});
	   cards = [];
	   move = move+1;
	   win = win+1;
	}

	function unmatch() {
	   cards.forEach(function(card, i) {
		   $(card).removeClass('open show');
	   });
	   cards = [];
	   move = move+1;
	}

	function score(){
		if(move > 20){
			$('#s1').removeClass('fa-star');
			$('#s2').removeClass('fa-star');
		} else if(move > 12 && move <= 20){
			$('#s1').removeClass('fa-star');
		}
		
	}

	function  moves(){
		$('.moves').text(move);  
	}

	function winner(){
		if(win === 8){
			// handle winner modal
			var m = $("#win"); 
			m.modal({
				show: true
			});
			m.on('modal:close', function(ev, modal) {
				document.location.reload(true);
			});
			$('.timer').text(timer+' Segundos');
			if(move == 12) {
				$('.score-stars').append('<i class="fa fa-star"></i>');
				$('.score-stars').append('<i class="fa fa-star"></i>');
				$('.score-stars').append('<i class="fa fa-star"></i>');
			} else if(move > 12 && move <= 20) {
				$('.score-stars').append('<i class="fa fa-star"></i>');
				$('.score-stars').append('<i class="fa fa-star"></i>');
			}else {
				$('.score-stars').append('<i class="fa fa-star"></i>');
			}
		  }
	}

	function shuffle(arr) {
		var currentIndex = arr.length, temporaryValue, randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temporaryValue;
		}
		return arr;
	}

});