/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

$( document ).ready(function() {
    var move = 0, win = 0, cards = [];

    setTimeout(function() {
        $('li').removeClass('open show');    
    }, 3000);
            
    $(".card").each(function(i, el) {
        el.addEventListener('click', function(ev){
            displayCard(ev);
            cards.push(el);
            compare();
            score();
            winner();
        });
    });

    $('.restart').on('click', '.fa-repeat', function(ev){
        shuffle(cards);    
    })

    function  moves(){
        $('span').text(move);  
     }
    
    function score(){
        if(move > 12){
            $('#s1').removeClass('fa-star');
            $('#s2').removeClass('fa-star');
        } else if(move > 8 && move <= 12){
            $('#s1').removeClass('fa-star');
        } 
    }
    
    function winner(){
        if(win === 8){
            $('#win').modal('show');
          }
    }
    
    function shuffle(cards) {
        var currentIndex = cards.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }

        return cards;
    }

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
                        setTimeout(
                            function(){
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
});


/*

cards = [ {} ];

card := {
    "class": "fa fa-diamond"
}

doDeck() {
    document.createElemt
}

 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
