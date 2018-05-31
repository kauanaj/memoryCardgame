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
    var cards = [];
    
    $(".card").each(function(i, el) {
        el.addEventListener('click', function(ev){
            displayCard(ev);
            cards.push(el);
            compare();
        });
    });

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    $('.score-panel').on('click','.begin', function(evt){
            $('li').removeClass('open show');
    });

    function displayCard(evt) {
        $(evt.target).addClass('open show');
    }
    
    function compare() {
        if(cards.length > 1) {
            var prv, cur = null;
            cards.forEach(function(card, i) {
                cur = card.children[0].className;
                if( prv !== null ) {
                    if( prv === cur ) {
                        match();
                    } else {
                        setTimeout(
                            function(){
                                unmatch();
                            }, 500);
                        ;
                    }
                }
                prv = card.children[0].className;
            });
        }
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
