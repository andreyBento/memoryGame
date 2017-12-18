// Define o construtor do jogo
const Game = function(stageParam){
    this.cards = [];
    this.cardsMirror = [];
    this.cardsOpen = [];
    this.time = '00:00';
    this.movements = 0;
    this.stageNumber = stageParam;
    this.begin(); // starta o jogo
}

// Função que começa o jogo
Game.prototype.begin = function(){
    this.stage(); // Starta a função que controla as necessidades de cada fase
    this.timer(); // Starta o contador de tempo
}

// Função que controla as necessidades das fases
Game.prototype.stage = function(){
    const body = document.querySelector('.memory-body');
    if(this.stageNumber == 1){
        this.createCard(4); // controla a quantitade de cartas na fase
    } else if(this.stageNumber == 2){
        this.createCard(8);
    } else if(this.stageNumber == 3){
        this.createCard(16);
    } else if(this.stageNumber == 4){
        this.createCard(28);
    }
    this.born(); // coloca as cartas na tela
    body.setAttribute('class','memory-body stage'+ this.stageNumber); // coloca uma classe com o numero da fase no body do jogo
}

// Função que controla o contador de tempo
Game.prototype.timer = function(){
    let timerHtml = document.getElementById('timerHtml'),
        min = '00';
        sec = '00';

    timerHtml.innerHTML = this.time;

    this.stopTimer = function(){ 
        clearInterval(updateTime);
        timerHtml.style.color = '#666';
    } // função que para o timer

    const updateTime = setInterval(function(){
        if(sec < 59){
            sec++;
            sec = addZero(sec);
        } else{
            min++;
            min = addZero(min);
            sec = '00';
        }
        this.time = min + ':' + sec;
        timerHtml.innerHTML = this.time;
        if(min == 04){
            timerHtml.style.color = '#CF5D64';
        }
        if(min == 05){
            game.stopTimer();
            game.modal = new Modal('retry');
        }
    }, 1000);

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    } // função que adiciona um zero

}

// Função que conta os movimentos
Game.prototype.moves = function(){
    this.movements++;
    let movesHtml = document.getElementById('movesHtml');
    movesHtml.innerHTML =  this.movements;
}

// Função que cria as cartas
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

// Função que adiciona os icones nas cartas
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

// Função que desvira as cartas após elas não são o par correto
Game.prototype.unturn = function(elementsArray){
    setTimeout(function() {
        for(i = 0; i < elementsArray.length; i++){
            elementsArray[i].setAttribute('class', 'card');
            elementsArray[i].disabled = false;
            elementsArray[i].innerHTML = '';
        }
    }, 2000);
}

// Função que desvira as cartas no começo do jogo, com um tempo diferente para cada fase
Game.prototype.firstUnturn = function(elementsArray){
    if(this.stageNumber == 1){
        setTimeout(function() {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 1500);
    } else if(this.stageNumber == 2){
        setTimeout(function() {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 2500);
    } else if(this.stageNumber == 3){
        setTimeout(function() {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 3500);
    } else if(this.stageNumber == 4){
        setTimeout(function() {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 5000);
    }
}

// Função que verifica se as cartas abertas possuem o mesmo icone
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

// Função que vira a carta clicada
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

// Função que coloca as cartas na tela
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

    this.firstUnturn(cardElementArray);

    this.cardClick();
    this.btnPlayClick();
}

// Função que conta a quantidade de estrelas ganha na fase
Game.prototype.starCount = function(){
    let actualStage = document.getElementById('body').classList[1];
    if(actualStage == 'stage1'){
        if(this.movements <= 10){
            return 3;
        } else if(this.movements > 10 && this.movements <= 14){
            return 2;
        } else if(this.movements > 14 && this.movements <= 18){
            return 1;
        } else if(this.movements > 18){
            return 0;
        }
    }
    if(actualStage == 'stage2'){
        if(this.movements <= 24){
            return 3;
        } else if(this.movements > 24 && this.movements <= 34){
            return 2;
        } else if(this.movements > 34 && this.movements <= 42){
            return 1
        } else if(this.movements > 42){
            return 0;
        }
    }
    if(actualStage == 'stage3'){
        if(this.movements <= 46){
            return 3;
        } else if(this.movements > 46 && this.movements <= 62){
            return 2;
        } else if(this.movements > 62 && this.movements <= 76){
            return 1;
        } else if(this.movements > 76){
            return 0;
        }
    }
    if(actualStage == 'stage4'){
        if(this.movements <= 62){
            return 3;
        } else if(this.movements > 62 && this.movements <= 72){
            return 2;
        } else if(this.movements > 72 && this.movements <= 98){
            return 1;
        } else if(this.movements > 98){
            return 0;
        }
    }
}

// Função que define o usuário escolhido
Game.prototype.defineUser = function(){
    const newUsertHtml = document.getElementById('newUser');
    let lastUserHtml = document.getElementById('lastUser'),
        lastUser;

    for(i = 0;i < lastUserHtml.classList.length; i++){
        if(lastUserHtml.classList[i] == 'active'){
            lastUser = true;
        }
    }
    if(lastUser == true){
        window.localStorage.user = lastUserHtml.innerHTML;
        return true;
    } else if(newUsertHtml.value != undefined && newUsertHtml.value != "" && newUsertHtml.value != null){
        window.localStorage.user = newUsertHtml.value;
        return true;
    } else {
        newUsertHtml.classList.add('erro');
        let erroText = document.createElement('P');
        erroText.innerHTML = 'Por favor preencha o campo de usuário';
        erroText.setAttribute('class', 'erro');
        newUsertHtml.parentNode.appendChild(erroText);
        return false;
    }
}

// Função que checa se todas as cartas estão corretas para finalizar o jogo
Game.prototype.checkFinish = function(){
    const cardSuccessArray = document.querySelectorAll('.success');
    if(cardSuccessArray.length == this.cardsArray.length){

        this.stopTimer(); // Para a contagem de tempo

        window.localStorage.time = document.getElementById('timerHtml').innerHTML;
        window.localStorage.moves = document.getElementById('movesHtml').innerHTML;
        window.localStorage.stage = this.stageNumber;
        window.localStorage.stars = this.starCount();

        this.modal = new Modal('success');
    }
}

// Função de clique nas cartas
Game.prototype.cardClick = function(){

    this.cardsArray = document.querySelectorAll('.card');
    for(i = 0; i < this.cardsArray.length; i++){
        this.cardsArray[i].addEventListener('click', function(){
            let item = this;
            game.moves(); // Invoca o contador de movimentos
            game.turnCard(item); // Vira a carta clicada
            game.checkFinish(); // Verifica se o jogo pode ser finalizado
        });
    }
}

Game.prototype.btnPlayClick = function(){
    document.getElementById('btnPlay').addEventListener('click', function(){
        game.reset();
        this.style.display = 'none';
        beginModal = new Modal('begin');
    });
}

// Função que reseta o jogo
Game.prototype.reset = function(){

    let timerHtml = document.getElementById('timerHtml'),
        time = '00' + ':' + '00';
    timerHtml.innerHTML = time;

    this.movements = 0;
    let movesHtml = document.getElementById('movesHtml');
    movesHtml.innerHTML =  this.movements;

    document.querySelector('.memory-body').innerHTML = null;
}