/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

const Game = function(stageParam){
    this.cards = [];
    this.cardsMirror = [];
    this.cardsOpen = [];
    this.begin(stageParam);
}

const Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card card-open" disabled data-name="'+ this.name +'">' + '</button>';
}

Game.prototype.begin = function(stageParam){
    this.stage(stageParam);
    this.timer();
    // this.moves();
}

Game.prototype.stage = function(stage){
    const body = document.querySelector('.memory-body');
    if(stage == 1){
        this.createCard(4);
    } else if(stage == 2){
        this.createCard(12);
    } else if(stage == 3){
        this.createCard(16);
    }
    this.born();
    body.setAttribute('class','memory-body stage'+ stage);
}

Game.prototype.timer = function(){
    let header = document.querySelector('.memory-header'),
        time = '00' + ':' + '00',
        min = '00',
        sec = '00';

    header.innerHTML += '<p class="timer"><span id="timerHtml">'+ time +'</span> : Tempo</p>';
    let timerHtml = document.getElementById('timerHtml');

    const updateTime = setInterval(function(){
        if(sec < 59){
            sec++;
            sec = addZero(sec);
        } else{
            min++;
            min = addZero(min);
            sec = '00';
        }
        time = min + ':' + sec;
        timerHtml.innerHTML = time;
    }, 1000);

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

}

// Game.prototype.moves = function(){
//     let header = document.querySelector('.memory-header');
//     header.innerHTML += '<p class="timer"><span id="timerHtml">'+ time +'</span> : Tempo</p>';


// }

Game.prototype.createCard = function(quantity){
    for(i = 0; i < quantity; i++){
        let cardName = 'item' + (i + 1),
            cardKey = i + 1;
        this.cards.push(new Card(cardName, cardKey));

        cardName = 'item' + (i + quantity + 1),
        cardKey = this.cards[i].key;
        this.cardsMirror.push(new Card(cardName, cardKey));
    }
}

Game.prototype.addIcon = function(item){
    let dataIcone = item.getAttribute('data-name');

    for(a = 0; a < this.cards.length; a++){
        if(dataIcone == this.cards[a].name){
            item.innerHTML += '<span class="memory '+ this.cards[a].name +'"></span>';
        } else if (dataIcone == this.cardsMirror[a].name){
            let iconePar = 'item' + this.cardsMirror[a].key;
            item.innerHTML += '<span class="memory '+ iconePar +'"></span>';
        }
    }
}

Game.prototype.unturn = function(elementsArray){
    setTimeout(() => {
        for(i = 0; i < elementsArray.length; i++){
            elementsArray[i].setAttribute('class', 'card');
            elementsArray[i].disabled = false;
            elementsArray[i].innerHTML = '';
        }
    }, 2000);
}

Game.prototype.checkMatch = function(){
    const cardOpenArray = document.querySelectorAll('.card-open');
    if(this.cardsOpen.length == 2){
        if(this.cardsOpen[0] == this.cardsOpen[1]){
            for(i = 0; i < cardOpenArray.length; i++){
                let cardClass = cardOpenArray[i].getAttribute('class');
                if(cardClass == 'card card-open'){
                    cardOpenArray[i].setAttribute('class', 'card success');
                }
            }
            return this.cardsOpen = [];
        } else {
            for(i = 0; i < cardOpenArray.length; i++){
                cardOpenArray[i].setAttribute('class', 'card fail');
            }
            this.unturn(cardOpenArray);
            return this.cardsOpen = [];
        }
    }
}

Game.prototype.turnCard = function(item){
    let itemClass = item.getAttribute('class'),
        dataIcone = item.getAttribute('data-name');

    if(itemClass == 'card'){
        item.setAttribute('class','card card-open');
        item.disabled = true;
        this.addIcon(item);
        for(i = 0; i < this.cards.length; i++){
            if(dataIcone == this.cards[i].name){
                this.cardsOpen.push(this.cards[i].key);
            } else if (dataIcone == this.cardsMirror[i].name){
                this.cardsOpen.push(this.cardsMirror[i].key);
            }
        }
    }
    this.checkMatch();
}

Game.prototype.born = function(){

    let totalCards = this.cards.concat(this.cardsMirror),
        arrayLength = totalCards.length;
    for(i = 0; i < arrayLength; i++){
        const item = Math.floor(Math.random() * (totalCards.length - 0)) + 0;
        document.querySelector('.memory-body').innerHTML += totalCards[item].template;
        totalCards.splice(item, 1);
    }

    let cardElementArray = document.querySelectorAll('.card');
    for(i = 0; i < cardElementArray.length; i++){
        this.addIcon(cardElementArray[i]);
    }

    this.unturn(cardElementArray);
}

Game.prototype.checkFinish = function(){
    const cardSuccessArray = document.querySelectorAll('.success');
    if(cardSuccessArray.length == cardsArray.length){
        alert('Você Ganhou!');
    }
}

Game.prototype.cardClick = function(item){
    this.turnCard(item);
    this.checkFinish();
}

const game = new Game(3);

const cardsArray = document.querySelectorAll('.card');
for(i = 0; i < cardsArray.length; i++){
    cardsArray[i].addEventListener('click', function(){
        game.cardClick(this);
    });
}
