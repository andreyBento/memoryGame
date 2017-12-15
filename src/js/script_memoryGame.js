/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

const Game = function(stageParam){
    this.cards = [];
    this.cardsMirror = [];
    this.cardsOpen = [];
    this.movements = 0;
    this.stageNumber = stageParam;
    this.begin();
}

Game.prototype.begin = function(){
    this.stage();
    this.timer();
}

Game.prototype.stage = function(){
    const body = document.querySelector('.memory-body');
    if(this.stageNumber == 1){
        this.createCard(4);
    } else if(this.stageNumber == 2){
        this.createCard(8);
    } else if(this.stageNumber == 3){
        this.createCard(12);
    } else if(this.stageNumber == 4){
        this.createCard(16);
    } else if(this.stageNumber == 5){
        this.createCard(20);
    } else if(this.stageNumber == 6){
        this.createCard(24);
    } else if(this.stageNumber == 7){
        this.createCard(28);
    }
    this.born();
    body.setAttribute('class','memory-body stage'+ this.stageNumber);
}

Game.prototype.timer = function(){
    let timerHtml = document.getElementById('timerHtml'),
        time = '00' + ':' + '00',
        min = '00';
        sec = '00';

    timerHtml.innerHTML = time;

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

    this.stopTimer = function(){ 
        clearInterval(updateTime);
    }

}

Game.prototype.moves = function(){
    this.movements++;
    let movesHtml = document.getElementById('movesHtml');
    movesHtml.innerHTML =  this.movements;
}

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

    this.cardClick();
}

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
        if(this.movements <= 18){
            return 3;
        } else if(this.movements > 18 && this.movements <= 28){
            return 2;
        } else if(this.movements > 28 && this.movements <= 36){
            return 1
        } else if(this.movements > 36){
            return 0;
        }
    }
    if(actualStage == 'stage3'){
        if(this.movements <= 26){
            return 3;
        } else if(this.movements > 26 && this.movements <= 36){
            return 2;
        } else if(this.movements > 36 && this.movements <= 44){
            return 1;
        } else if(this.movements > 44){
            return 0;
        }
    }
    if(actualStage == 'stage4'){
        if(this.movements <= 34){
            return 3;
        } else if(this.movements > 34 && this.movements <= 44){
            return 2;
        } else if(this.movements > 44 && this.movements <= 52){
            return 1;
        } else if(this.movements > 52){
            return 0;
        }
    }
    if(actualStage == 'stage5'){
        if(this.movements <= 42){
            return 3;
        } else if(this.movements > 42 && this.movements <= 52){
            return 2;
        } else if(this.movements > 52 && this.movements <= 60){
            return 1;
        } else if(this.movements > 60){
            return 0;
        }
    }
    if(actualStage == 'stage6'){
        if(this.movements <= 50){
            return 3;
        } else if(this.movements > 50 && this.movements <= 60){
            return 2;
        } else if(this.movements > 60 && this.movements <= 68){
            return 1;
        } else if(this.movements > 68){
            return 0;
        }
    }
    if(actualStage == 'stage7'){
        if(this.movements <= 58){
            return 3;
        } else if(this.movements > 58 && this.movements <= 68){
            return 2;
        } else if(this.movements > 68 && this.movements <= 76){
            return 1;
        } else if(this.movements > 76){
            return 0;
        }
    }
}

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
    } else if(newUsertHtml.value != undefined || newUsertHtml.value != '' || newUsertHtml.value != null){
        window.localStorage.user = newUsertHtml.value;
    }
}

Game.prototype.checkFinish = function(){
    const cardSuccessArray = document.querySelectorAll('.success');
    if(cardSuccessArray.length == this.cardsArray.length){

        this.stopTimer(); // Para a contagem de tempo

        window.localStorage.time = document.getElementById('timerHtml').innerHTML;
        window.localStorage.moves = document.getElementById('movesHtml').innerHTML;
        window.localStorage.stars = this.starCount();

        this.modal = new Modal('success');
        new Ranking();
    }
}

Game.prototype.cardClick = function(){

    this.cardsArray = document.querySelectorAll('.card');
    for(i = 0; i < this.cardsArray.length; i++){
        this.cardsArray[i].addEventListener('click', function(){
            let item = this;
            game.moves();
            game.turnCard(item);
            game.checkFinish();
        });
    }
}

Game.prototype.reset = function(){

    let timerHtml = document.getElementById('timerHtml'),
        time = '00' + ':' + '00';
    timerHtml.innerHTML = time;

    this.movements = 0;
    let movesHtml = document.getElementById('movesHtml');
    movesHtml.innerHTML =  this.movements;

    document.querySelector('.memory-body').innerHTML = '';
}

const Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card card-open" disabled data-name="'+ this.name +'">' + '</button>';
}


const Modal = function(param){
    this.actualModal = param;
    this.born();
}

Modal.prototype.starCount = function(star1, star2, star3){

    if(window.localStorage.stars == 1){
        star1.setAttribute('class', 'oi oi-star active');
    } else if(window.localStorage.stars == 2){
        star1.setAttribute('class', 'oi oi-star active');
        star2.setAttribute('class', 'oi oi-star active');
    } else if(window.localStorage.stars == 3){
        star1.setAttribute('class', 'oi oi-star active');
        star2.setAttribute('class', 'oi oi-star active');
        star3.setAttribute('class', 'oi oi-star active');
    }
}

Modal.prototype.modalCloseTemplate = function(){
    const modalClose = document.createElement('A'),
          modalCloseInfo = document.createElement('P'),
          modalBtnClose = document.createElement('BUTTON'),
          modalBtnCloseSpan = document.createElement('SPAN');

    modalClose.setAttribute('class', 'modal__close');
    modalCloseInfo.setAttribute('id', 'modalCloseInfo');
    modalBtnClose.setAttribute('class', 'btn btn--close');
    modalBtnCloseSpan.setAttribute('class', 'oi oi-x');

    modalClose.appendChild(modalCloseInfo);
    modalBtnClose.appendChild(modalBtnCloseSpan);
    modalClose.appendChild(modalBtnClose);
    return modalClose;
}

Modal.prototype.modalStarsTemplate = function(){
    const modalStars = document.createElement('DIV'),
          modalStarsTitle = document.createElement('H3'),
          modalStarsSpan1 = document.createElement('SPAN'),
          modalStarsSpan2 = document.createElement('SPAN'),
          modalStarsSpan3 = document.createElement('SPAN'),
          modalStarsDesc = document.createElement('P');

    modalStars.setAttribute('class', 'modal__estrelas');
    modalStarsTitle.innerHTML = 'Seu desempenho recebeu honoráveis:';

    modalStarsSpan1.setAttribute('class', 'oi oi-star');
    modalStarsSpan2.setAttribute('class', 'oi oi-star');
    modalStarsSpan3.setAttribute('class', 'oi oi-star');

    modalStarsDesc.innerHTML = window.localStorage.stars + ' estrela(s)';

    modalStars.appendChild(modalStarsTitle);
    modalStars.appendChild(modalStarsSpan1);
    modalStars.appendChild(modalStarsSpan2);
    modalStars.appendChild(modalStarsSpan3);
    modalStars.appendChild(modalStarsDesc);

    this.starCount(modalStarsSpan1, modalStarsSpan2, modalStarsSpan3);

    return modalStars;
}

Modal.prototype.modalFormTemplate = function(){
    const modalForm = document.createElement('FORM'),
          modalFormLabel = document.createElement('LABEL'),
          modalFormBtnLastuser = document.createElement('BUTTON'),
          modalFormInput = document.createElement('INPUT'),
          modalFormBtnChoose = document.createElement('BUTTON');

    modalFormLabel.innerHTML = 'Salvar como:';
    modalFormBtnLastuser.setAttribute('id', 'lastUser');
    modalFormBtnLastuser.setAttribute('class', 'btn btn--user');
    modalFormInput.setAttribute('id', 'newUser');
    modalFormInput.setAttribute('type', 'text');
    modalFormInput.setAttribute('placeholder', 'novo usuario...');
    modalFormInput.setAttribute('class', 'input-padrao');
    modalFormBtnChoose.setAttribute('class', 'btn btn-sm btn--success');
    modalFormBtnChoose.setAttribute('id', 'btnChoose');
    modalFormBtnChoose.innerHTML = 'escolher';

    modalForm.appendChild(modalFormLabel);
    modalForm.appendChild(modalFormBtnLastuser);
    modalForm.appendChild(modalFormInput);
    modalForm.appendChild(modalFormBtnChoose);

    return modalForm;
}

Modal.prototype.modalButtonNextTemplate = function(){
    const modalButtonNext = document.createElement('BUTTON');

    modalButtonNext.setAttribute('class', 'btn btn-sm btn--success');
    modalButtonNext.setAttribute('id', 'btnNext');
    modalButtonNext.innerHTML = 'próxima fase';

    return modalButtonNext;
}

Modal.prototype.modalButtonAgainTemplate = function(){
    const modalBeginAgain = document.createElement('BUTTON');

    modalBeginAgain.setAttribute('class', 'btn btn-sm');
    modalBeginAgain.setAttribute('id', 'btnbeginAgain');
    modalBeginAgain.innerHTML = 'começar denovo';

    return modalBeginAgain;
}

Modal.prototype.modalButtonBeginTemplate = function(){
    const modalBeginAgain = document.createElement('BUTTON');

    modalBeginAgain.setAttribute('class', 'btn btn-sm btn--begin');
    modalBeginAgain.setAttribute('id', 'btnbegin');
    modalBeginAgain.innerHTML = 'vamos lá!';

    return modalBeginAgain;
}

Modal.prototype.modalTemplate = function(){
    const modal = document.createElement('DIV'),
          modalClose = this.modalCloseTemplate(),
          modalEmote = document.createElement('IMG'),
          modalTitle = document.createElement('H1'),
          modalSubtitle = document.createElement('H2'),
          modalDesc = document.createElement('P');

    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'modal');
    modalEmote.setAttribute('id', 'modalEmote');
    modalTitle.setAttribute('id', 'modalTitle');
    modalSubtitle.setAttribute('id', 'modalSubtitle');
    modalDesc.setAttribute('id', 'modalDesc');

    
    modal.appendChild(modalEmote);
    modal.appendChild(modalTitle);
    modal.appendChild(modalSubtitle);
    if(this.actualModal == 'success'){
        modal.appendChild(this.modalStarsTemplate());
    }
    modal.appendChild(modalDesc);
    if(this.actualModal == 'success'){
        modal.appendChild(modalClose);
        modal.appendChild(this.modalFormTemplate());
    } else if (this.actualModal == 'nextStage' || this.actualModal == 'lastStage'){
        modal.appendChild(modalClose);
        modal.appendChild(this.modalButtonNextTemplate());
    } else if (this.actualModal == 'lastSuccess'){
        modal.appendChild(modalClose);
        modal.appendChild(this.modalButtonNextTemplate());
        modal.appendChild(this.modalButtonAgainTemplate());
    } else if (this.actualModal == 'begin'){
        modal.appendChild(this.modalButtonBeginTemplate());
    }

    return modal;
}

Modal.prototype.modifyModal = function(){
    if(this.actualModal == 'success'){
        document.getElementById('modalCloseInfo').innerHTML = 'não desejo salvar';

        document.getElementById('modalEmote').setAttribute('src', 'img/emote-glasses.svg');
        document.getElementById('modalEmote').setAttribute('alt', 'Emoticon com óculos escuros');

        document.getElementById('modalTitle').innerHTML = 'Parabéns!';

        document.getElementById('modalSubtitle').innerHTML = 'Você concluiu esta fase.';

        document.getElementById('modalDesc').innerHTML = 'Após a conclusão de cada fase você pode salvar o seu desempenho em um ranking, é só escolher um usuário abaixo e pronto!';

        this.checkUser();

    } else if (this.actualModal == 'nextStage'){
        document.getElementById('modalCloseInfo').innerHTML = 'não desejo continuar';

        document.getElementById('modalEmote').setAttribute('src', 'img/emote-wink.svg');
        document.getElementById('modalEmote').setAttribute('alt', 'Emoticon piscando');

        document.getElementById('modalTitle').innerHTML = 'Continua';

        document.getElementById('modalSubtitle').innerHTML = 'Outra, outra, outra, outra!';

        document.getElementById('modalDesc').innerHTML = 'Vamos seguir adiante. Agora a dificuldade irá aumentar, cuidado com seus movimentos, ou pode perder muitas estrelas!';
    } else if (this.actualModal == 'lastStage'){
        document.getElementById('modalCloseInfo').innerHTML = 'não desejo continuar';

        document.getElementById('modalEmote').setAttribute('src', 'img/emote-laststage.svg');
        document.getElementById('modalEmote').setAttribute('alt', 'Emoticon feliz');

        document.getElementById('modalTitle').innerHTML = 'Última fase';

        document.getElementById('modalSubtitle').innerHTML = 'Como você chegou aqui?';

        document.getElementById('modalDesc').innerHTML = 'Este é seu último desafio. Será que consegue derrotar este boss?';
    } else if (this.actualModal == 'lastSuccess'){
        document.getElementById('modalCloseInfo').innerHTML = 'não desejo continuar';
        
        document.getElementById('modalEmote').setAttribute('src', 'img/emote-end.svg');
        document.getElementById('modalEmote').setAttribute('alt', 'Emoticon Surpreso');

        document.getElementById('modalTitle').innerHTML = 'Wooow!!!';

        document.getElementById('modalSubtitle').innerHTML = 'Turn down for what!!!';

        document.getElementById('modalDesc').innerHTML = 'Você conseguiu derrotar todos os estágios e com isso salvar o mundo! Bem, talvez nem tanto. Mas parabéns!';
    } else if (this.actualModal == 'begin'){
        document.getElementById('modalEmote').setAttribute('src', 'img/emote-begin.svg');
        document.getElementById('modalEmote').setAttribute('alt', 'Emoticon com língua');

        document.getElementById('modalTitle').innerHTML = 'Bem-vindo';

        document.getElementById('modalSubtitle').innerHTML = 'Este é o memor.it';

        document.getElementById('modalDesc').innerHTML = 'Meu primeiro jogo, um simples jogo da memória com 7 fases. Será que você consegue me derrotar?';
    }
}

Modal.prototype.born = function(){
    const overlay = document.createElement('DIV'),
          modalHtml = this.modalTemplate();
    let mainHtml = document.getElementById('mainGame');

    overlay.setAttribute('class', 'overlay');
    overlay.setAttribute('id', 'overlay');

    mainHtml.appendChild(overlay);
    mainHtml.appendChild(modalHtml);

    this.modifyModal();

    document.getElementById('overlay').classList.add('active');
    document.getElementById('modal').classList.add('active');
    setTimeout(function(){
        document.getElementById('modal').style.opacity = '1';
        document.getElementById('modal').style.left = '50%';
        document.getElementById('overlay').style.opacity = '1';
    }, 600);

    this.btnClick();
}

Modal.prototype.destroy = function(){
    let existingOverlay = document.getElementById('overlay'),
        existingModal = document.getElementById('modal');

    existingModal.style.opacity = '0';
    existingModal.style.left = '45%';
    existingOverlay.style.opacity = '0';
    setTimeout(function(){
        existingOverlay.classList.remove('active');
        existingModal.classList.remove('active');
        existingOverlay.remove();
        existingModal.remove();
    }, 600);
}

Modal.prototype.btnClick = function(){

    if(this.actualModal == 'success'){
        document.getElementById('lastUser').addEventListener('click', function(event){
            event.preventDefault();
            document.getElementById('newUser').classList.remove('active');
            this.classList.add('active');
        });
        document.getElementById('newUser').addEventListener('focus', function(){
            document.getElementById('lastUser').classList.remove('active');
            this.classList.add('active');
        });
        document.getElementById('btnChoose').addEventListener('click', function(event){
            event.preventDefault();
            game.defineUser();
            game.modal.destroy();
            setTimeout(function(){
                game.modal = new Modal('nextStage');
            },600);
        });
    } else if (this.actualModal == 'nextStage' || this.actualModal == 'lastStage'){
        document.getElementById('btnNext').addEventListener('click', function(event){
            event.preventDefault();
            game.modal.destroy();

            let newStage = game.stageNumber;
            newStage++
            game.reset();

            game = new Game(newStage);

        });
    } else if (this.actualModal == 'begin'){
        document.getElementById('btnbegin').addEventListener('click', function(){
            beginModal.destroy();
            setTimeout(() => {
                game = new Game(1);
            }, 600);
        })
    }

}

Modal.prototype.checkUser = function(){
    let lastUserHtml = document.getElementById('lastUser');

    if(window.localStorage.user != undefined && window.localStorage.user != "" && window.localStorage.user != null && window.localStorage.user != " "){
        lastUserHtml.style.display = 'block';
        lastUserHtml.innerHTML = window.localStorage.user;
    } else {
        lastUserHtml.style.display = 'none';
    }
}


const Ranking = function(){
    this.user = window.localStorage.user;
    this.time = window.localStorage.time;
    this.moves = window.localStorage.moves;
    this.stars = window.localStorage.stars;
    this.stage = window.localStorage.stage;
    this.born();
}

Ranking.prototype.born = function(){
    const rankingHtml = document.getElementsByClassName('memory-ranking');
}

let game;
const beginModal = new Modal('begin');