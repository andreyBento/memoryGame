/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

var Game = function(stageParam){
    this.cards = [];
    this.cardsMirror = [];
    this.actualStage = this.stage(stageParam);
}

var Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card card-open" disabled data-name="'+ this.name +'">' + '</button>';
}

Game.prototype.stage = function(stage){

    if(stage == 1){
        this.card(8);
        this.born();
    } else if(stage == 2){
        this.card(16);
        this.born();
    } else if(stage == 3){
        this.card(32);
        this.born();
    }
}

Game.prototype.card = function(quantity){
    for(i = 0; i < quantity; i++){
        let cardName = 'item' + (i + 1),
            cardKey = i + 1;
        this.cards.push(new Card(cardName, cardKey));
    }
    for(i = 0; i < quantity; i++){
        cardName = 'item' + (i + this.cards.length + 1),
        cardKey = this.cards[i].key;
        this.cardsMirror.push(new Card(cardName, cardKey));
    }
}

Game.prototype.born = function(){

    const totalCards = this.cards.concat(this.cardsMirror),
          arrayLength = totalCards.length;
    for(i = 0; i < arrayLength; i++){
        const item = Math.floor(Math.random() * (totalCards.length - 0)) + 0;
        document.querySelector('.memory-body').innerHTML += totalCards[item].template;
        totalCards.splice(item, 1);
    }

    var cardElementArray = document.querySelectorAll('.card');

    for(i = 0; i < cardElementArray.length; i++){
        var dataIcone = cardElementArray[i].getAttribute('data-name');
        for(j = 0; j < this.cards.length; j++){
            if(dataIcone == this.cards[j].name){
                cardElementArray[i].innerHTML += '<span class="memory '+ this.cards[j].name +'"></span>';
            } else if (dataIcone == this.cardsMirror[j].name){
                var iconePar = 'item' + this.cardsMirror[j].key;
                cardElementArray[i].innerHTML += '<span class="memory '+ iconePar +'"></span>';
            }
        }
    }

    setTimeout(function(){
        for(i = 0; i < cardElementArray.length; i++){
            cardElementArray[i].setAttribute('class', 'card');
            cardElementArray[i].disabled = false;
            cardElementArray[i].innerHTML = '';
        }
    }, 2000);
}

new Game(1);