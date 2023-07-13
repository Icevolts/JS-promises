$(function(){
    let baseURL = 'https://deckofcardsapi.com/api/deck'

    // 1
    $.getJSON(`${baseURL}/new/draw`)
    .then(res =>{ let {suit,value} = res.cards[0]
    console.log(`${value} of ${suit}`)});
    
    // 2
    let firstDraw = null;
    $.getJSON(`${baseURL}/new/draw`)
        .then(res => {firstDraw = res.cards[0];
        let deckId = res.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw`)})
        .then(res => {
            let secDraw = res.cards[0];
            [firstDraw,secDraw].forEach(function(card){
                console.log(`${card.value} of ${card.suit}`);
            });
        });

    // 3
    let deckId = null;
    let $btn= $('button');
    let $div = $('div')
    $.getJSON(`${baseURL}/new/shuffle`).then(res =>{
        deckId = res.deck_id;
        $btn.show();
    });

    $btn.on('click',function(){
        $.getJSON(`${baseURL}/${deckId}/draw`).then(res => {
            let cardImg = res.cards[0].image;
            $div.append($('<img>', {src:cardImg}))
            if (res.remaining === 0) $btn.remove();
        });
    });
});