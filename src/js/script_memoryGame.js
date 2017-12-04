/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

var Card = function(name){
    this.name = name;
    this.template = '<div class="card" data-name="'+ this.name +'">' + '</div>';
}



var card1 = new Card('1'),
    card1Par = Object.create(card1);
var card2 = new Card('2'),
    card2Par = Object.create(card2);
var card3 = new Card('3'),
    card3Par = Object.create(card3);
var card4 = new Card('4'),
    card4Par = Object.create(card4);
var card5 = new Card('5'),
    card5Par = Object.create(card5);
var card6 = new Card('6'),
    card6Par = Object.create(card6);
var card7 = new Card('7'),
    card7Par = Object.create(card7);
var card8 = new Card('8'),
    card8Par = Object.create(card8);

document.querySelector('.memory-body').innerHTML = [card1.template + card1Par.template + card2.template + card2Par.template + card3.template + card3Par.template + card4.template + card4Par.template + card5.template + card5Par.template + card6.template + card6Par.template + card7.template + card7Par.template + card8.template + card8Par.template];

document.querySelector('.card').click(function(){
    console.log(card1.name);
    $(this).addClass('card-open');
    $('.card').map(function(){
        
    });
});
