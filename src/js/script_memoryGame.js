/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */


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
    setTimeout(() => {
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
        setTimeout(() => {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 1500);
    } else if(this.stageNumber == 2){
        setTimeout(() => {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 2500);
    } else if(this.stageNumber == 3){
        setTimeout(() => {
            for(i = 0; i < elementsArray.length; i++){
                elementsArray[i].setAttribute('class', 'card');
                elementsArray[i].disabled = false;
                elementsArray[i].innerHTML = '';
            }
        }, 3500);
    } else if(this.stageNumber == 4){
        setTimeout(() => {
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

        if(this.stageNumber == 4){
            this.modal = new Modal('lastSuccess');
        } else {
            this.modal = new Modal('success');
        }
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

// Construtor de carta, utilizado para armazenar o nome dos icones e a chave identificadora
const Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card card-open" disabled data-name="'+ this.name +'">' + '</button>';
}

// Construtor do modal
const Modal = function(param){
    this.actualModal = param;
    this.born(); // Ativa a função de contrução do modal
}

// Função que adiciona a classe active para a quantidade correta de estrelas
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

// Função que armazena o html do botão de fechar o modal
Modal.prototype.modalCloseTemplate = function(){
    const modalClose = document.createElement('A'),
          modalCloseInfo = document.createElement('P'),
          modalBtnClose = document.createElement('BUTTON'),
          modalBtnCloseSpan = document.createElement('SPAN');

    modalClose.setAttribute('class', 'modal__close');
    modalClose.setAttribute('id', 'modalClose');
    modalCloseInfo.setAttribute('id', 'modalCloseInfo');
    modalBtnClose.setAttribute('class', 'btn btn--close');
    modalBtnCloseSpan.setAttribute('class', 'oi oi-x');

    modalClose.appendChild(modalCloseInfo);
    modalBtnClose.appendChild(modalBtnCloseSpan);
    modalClose.appendChild(modalBtnClose);
    return modalClose;
}

// Função que armazena o html das estrelas do modal
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

// Função que armazena o html do formulário de definição de usuário do modal
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

// Função que armazena o html do botão de próxima fase
Modal.prototype.modalButtonNextTemplate = function(){
    const modalButtonNext = document.createElement('BUTTON');

    modalButtonNext.setAttribute('class', 'btn btn-sm btn--success');
    modalButtonNext.setAttribute('id', 'btnNext');
    modalButtonNext.innerHTML = 'próxima fase';

    return modalButtonNext;
}

// Função que armazena o html do botão que finaliza o modal
Modal.prototype.modalButtonEndTemplate = function(){
    const modalButtonEnd = document.createElement('BUTTON');

    modalButtonEnd.setAttribute('class', 'btn btn-sm btn--success');
    modalButtonEnd.setAttribute('id', 'btnEnd');
    modalButtonEnd.innerHTML = 'concluir jogo';

    return modalButtonEnd;
}

// Função que armazena o html do botão que permite jogar novamente desde o começo do jogo
Modal.prototype.modalButtonAgainTemplate = function(){
    const modalBeginAgain = document.createElement('BUTTON');

    modalBeginAgain.setAttribute('class', 'btn btn-sm');
    modalBeginAgain.setAttribute('id', 'btnbeginAgain');
    modalBeginAgain.innerHTML = 'começar denovo';

    return modalBeginAgain;
}

// Função que armazena o html do botão que permite jogar novamente a fase atual
Modal.prototype.modalButtonRetryTemplate = function(){
    const modalBeginRetry = document.createElement('BUTTON');

    modalBeginRetry.setAttribute('class', 'btn btn-sm btn--begin');
    modalBeginRetry.setAttribute('id', 'btnRetry');
    modalBeginRetry.innerHTML = 'tentar denovo';

    return modalBeginRetry;
}

// Função que armazena o html do botão de começo do jogo
Modal.prototype.modalButtonBeginTemplate = function(){
    const modalBeginAgain = document.createElement('BUTTON');

    modalBeginAgain.setAttribute('class', 'btn btn-sm btn--begin');
    modalBeginAgain.setAttribute('id', 'btnbegin');
    modalBeginAgain.innerHTML = 'vamos lá!';

    return modalBeginAgain;
}

// Função que armazena o html do modal, dependendo do tipo do modal passado define quais as necessidades do modal
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

    if(this.actualModal != 'begin' && this.actualModal != 'lastSuccess'){
        modal.appendChild(modalClose);
    }
    modal.appendChild(modalEmote);
    modal.appendChild(modalTitle);
    modal.appendChild(modalSubtitle);
    if(this.actualModal == 'success'){
        modal.appendChild(this.modalStarsTemplate());
    }
    modal.appendChild(modalDesc);
    if(this.actualModal == 'success'){
        modal.appendChild(this.modalFormTemplate());
    } else if (this.actualModal == 'nextStage' || this.actualModal == 'lastStage'){
        modal.appendChild(this.modalButtonNextTemplate());
    } else if (this.actualModal == 'lastSuccess'){
        modal.appendChild(this.modalButtonEndTemplate());
        modal.appendChild(this.modalButtonAgainTemplate());
    } else if (this.actualModal == 'begin'){
        modal.appendChild(this.modalButtonBeginTemplate());
    } else if(this.actualModal == 'retry'){
        modal.appendChild(this.modalButtonRetryTemplate());
    }

    return modal;
}

// Modifica os conteúdos textuais do modal de acordo com o modal atual
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

        document.getElementById('modalDesc').innerHTML = 'Meu primeiro jogo, um simples jogo da memória com 4 fases. Será que você consegue me derrotar?';
    } else if (this.actualModal == 'retry'){
        document.getElementById('modalCloseInfo').innerHTML = 'não desejo continuar';

        document.getElementById('modalEmote').setAttribute('src', 'img/emote-retry.svg');
        document.getElementById('modalEmote').setAttribute('alt', 'Emoticon Triste');

        document.getElementById('modalTitle').innerHTML = 'Ops';

        document.getElementById('modalSubtitle').innerHTML = 'Acabou o tempo!';

        document.getElementById('modalDesc').innerHTML = 'Aparentemente você demorou muito para concluir a fase. Vai ter que tentar denovo.';
    }
}

// Função que coloca o modal na tela
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

// Função que retira o modal existente
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

// Função que define os cliques de cada um dos botões do modal
Modal.prototype.btnClick = function(){

    if(this.actualModal == 'success'){
        document.getElementById('lastUser').addEventListener('click', function(event){
            event.preventDefault();
            document.getElementById('newUser').classList.remove('active');
            this.classList.add('active');
        }); // Adiciona a classe active no botão com o nome do último usuário
        document.getElementById('newUser').addEventListener('focus', function(){
            document.getElementById('lastUser').classList.remove('active');
            this.classList.add('active');
        }); // Adiciona a classe active no input de novo usuário
        document.getElementById('btnChoose').addEventListener('click', function(event){
            event.preventDefault();
            if(game.defineUser()){
                game.modal.destroy();
                if(game.stageNumber == 3){
                    setTimeout(function(){
                        game.modal = new Modal('lastStage'); // Verifica se a fase atual é a penúltima para poder iniciar modal específico
                    },600);
                } else {
                    setTimeout(function(){
                        game.modal = new Modal('nextStage'); // Inicia modal de próxima fase
                    },600);
                }
                if(document.getElementById('rankingContainer').classList.length == 1){
                    rank = new Ranking(); // Cria um novo ranking caso nenhum esteja na tela
                    rank.dropdownClick(); // Starta a função de clique do botão de usuário do rank
                } else {
                    rank.save(); // Salva as informações do usuário
                    rank.dropdownClick(); // Starta a função de clique do botão de usuário do rank
                }
            }
        }); // Controla o clique no botão de escolher usuário
        document.getElementById('modalClose').addEventListener('click', function(event){
            event.preventDefault();
            game.modal.destroy(); // Destroi o modal atual
            setTimeout(function(){
                game.modal = new Modal('nextStage'); // Chama o modal da próxima fase
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

        }); // Passa de fase
        document.getElementById('modalClose').addEventListener('click', function(event){
            event.preventDefault();
            game.modal.destroy();
        }); // Fecha o modal
    } else if (this.actualModal == 'begin'){
        document.getElementById('btnbegin').addEventListener('click', function(){
            beginModal.destroy();
            setTimeout(() => {
                game = new Game(1);
            }, 600);
        }); // Começa o jogo
    } else if(this.actualModal == 'lastSuccess'){
        document.getElementById('btnbeginAgain').addEventListener('click', function(){
            game.reset();
            beginModal.destroy();
            setTimeout(() => {
                game = new Game(1);
            }, 600);
        }); // Recomeça o jogo da primeira fase
        document.getElementById('btnEnd').addEventListener('click', function(){
            beginModal.destroy();
        }); // Finaliza o modal
    } else if(this.actualModal == 'retry'){
        document.getElementById('btnRetry').addEventListener('click', function(){
            let stageRepeat = game.stageNumber;
            game.reset();
            beginModal.destroy();
            setTimeout(() => {
                game = new Game(stageRepeat);
            }, 600);
        }); // Recomeça a fase atual
        document.getElementById('modalClose').addEventListener('click', function(event){
            event.preventDefault();
            game.modal.destroy();
        }); // Fecha o modal
    }

}

// Função que verifica se foi definido um usuário válido no formulário
Modal.prototype.checkUser = function(){
    let lastUserHtml = document.getElementById('lastUser');

    if(window.localStorage.user != undefined && window.localStorage.user != "" && window.localStorage.user != null && window.localStorage.user != " "){
        lastUserHtml.style.display = 'block';
        lastUserHtml.innerHTML = window.localStorage.user;
    } else {
        lastUserHtml.style.display = 'none';
    }
}

// Construtor do ranking
const Ranking = function(){
    this.booleanCheck = false;
    this.born();
}

// Função que armazena o html da lista geral que armazena os usuário registrados
Ranking.prototype.rankingListTemplate = function(){
    const userList = document.createElement('OL');

    userList.setAttribute('class', 'user-list');
    userList.setAttribute('id', 'userList');

    return userList;
}

// Função que armazena o html do item da lista geral com o nome do usuário e a lista dos detalhes
Ranking.prototype.userListTemplate = function(){
    const userListSave = document.createElement('LI'),
          userNameButton = document.createElement('BUTTON'),
          userNameButtonId = 'btnDropdown' + window.localStorage.user,
          userName = document.createElement('SPAN'),
          arrowDown = document.createElement('SPAN'),
          savesList = document.createElement('OL'),
          savesListId = window.localStorage.user + 'Saves';

    userListSave.setAttribute('class', 'user-list__save');
    userListSave.setAttribute('id', window.localStorage.user);
    userNameButton.setAttribute('class', 'btn btn-dropdown');
    userNameButton.setAttribute('id', userNameButtonId);
    userName.innerHTML = window.localStorage.user;
    arrowDown.setAttribute('class', 'oi oi-caret-bottom');
    savesList.setAttribute('class', 'save-list');
    savesList.setAttribute('id', savesListId);

    userNameButton.appendChild(userName);
    userNameButton.appendChild(arrowDown);

    userListSave.appendChild(userNameButton);
    userListSave.appendChild(savesList);

    return userListSave;
}

// Função que armazena o html dos dados a inserir na lista de dados salvos do usuário
Ranking.prototype.userSavesDetailsTemplate = function(){
    const saveListItem = document.createElement('LI'),
          saveStage = document.createElement('H4'),
          starsDetails = document.createElement('P'),
          starsIcon = document.createElement('SPAN'),
          movesDetails = document.createElement('P'),
          timeDetails = document.createElement('P');
    
    saveListItem.setAttribute('class', 'save-list__item');
    starsIcon.setAttribute('class', 'oi oi-star');

    saveStage.innerHTML = 'Fase : ' + window.localStorage.stage;

    starsDetails.innerHTML = 'estrelas ganhas: ' + window.localStorage.stars;
    starsDetails.appendChild(starsIcon);

    movesDetails.innerHTML = 'movimentos realizados: ' + window.localStorage.moves;

    timeDetails.innerHTML = 'tempo: ' + window.localStorage.time;

    saveListItem.appendChild(saveStage);
    saveListItem.appendChild(starsDetails);
    saveListItem.appendChild(movesDetails);
    saveListItem.appendChild(timeDetails);

    return saveListItem;
}

// Função que salva os dados no usuário
Ranking.prototype.save = function(){

    var lisArray = document.getElementById('userList').children;

    for(i = 0; i < lisArray.length; i++){
        if(lisArray[i].getAttribute('id') == window.localStorage.user){
            const saveId = window.localStorage.user + 'Saves';
            document.getElementById(saveId).appendChild(this.userSavesDetailsTemplate());
            return true;
        }
    }

    document.getElementById('userList').appendChild(this.userListTemplate());
    const saveId = window.localStorage.user + 'Saves';
    document.getElementById(saveId).appendChild(this.userSavesDetailsTemplate());
    return 'new user';
    
}

// Função que coloca a estrutura geral do ranking na tela
Ranking.prototype.born = function(){
    let gameContainer = document.getElementById('gameContainer'),
        rankingTitle = document.createElement('H2');

    rankingTitle.innerHTML = 'Ranking';

    this.rankingHtml = document.getElementById('rankingContainer');
    gameContainer.classList.add('ranking-active');

    this.rankingHtml.classList.add('active');
    this.rankingHtml.appendChild(rankingTitle);
    this.rankingHtml.appendChild(this.rankingListTemplate());

    this.save();
}

// Função que verifica o clique no botão que abre/fecha as informações salvas do usuário
Ranking.prototype.dropdownClick = function(){
    const buttonId = 'btnDropdown' + window.localStorage.user,
          buttonClasses = document.getElementById(buttonId).classList;
    document.getElementById(buttonId).addEventListener('click', function(){
        for(i = 0;i < buttonClasses.length; i++){
            if(buttonClasses[i] == 'active'){
                this.booleanCheck = true;
            }
        }
        if(this.booleanCheck){
            this.booleanCheck = false;
            document.getElementById(buttonId).classList.remove('active');
        } else {
            document.getElementById(buttonId).classList.add('active');
        }
    });
}

//  Cria as variáveis onde seram armazenados o jogo e o ranking
let game,
    rank;

// Armazena o primeiro modal do jogo
const beginModal = new Modal('begin');