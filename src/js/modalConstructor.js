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
                } else if(game.stageNumber == 4){
                    setTimeout(function(){
                        game.modal = new Modal('lastSuccess'); // Verifica se a fase atual é a última para poder iniciar modal específico
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
            if(game.stageNumber == 3){
                setTimeout(function(){
                    game.modal = new Modal('lastStage'); // Verifica se a fase atual é a penúltima para poder iniciar modal específico
                },600);
            } else if(game.stageNumber == 4){
                setTimeout(function(){
                    game.modal = new Modal('lastSuccess'); // Verifica se a fase atual é a última para poder iniciar modal específico
                },600);
            } else {
                setTimeout(function(){
                    game.modal = new Modal('nextStage'); // Inicia modal de próxima fase
                },600);
            }
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
            document.getElementById('btnPlay').style.display = 'block';
        }); // Fecha o modal
    } else if (this.actualModal == 'begin'){
        document.getElementById('btnbegin').addEventListener('click', function(){
            beginModal.destroy();
            setTimeout(function() {
                game = new Game(1);
            }, 600);
        }); // Começa o jogo
    } else if(this.actualModal == 'lastSuccess'){
        document.getElementById('btnbeginAgain').addEventListener('click', function(){
            game.reset();
            beginModal.destroy();
            setTimeout(function() {
                game = new Game(1);
            }, 600);
        }); // Recomeça o jogo da primeira fase
        document.getElementById('btnEnd').addEventListener('click', function(){
            beginModal.destroy();
            document.getElementById('btnPlay').style.display = 'block';
        }); // Finaliza o modal
    } else if(this.actualModal == 'retry'){
        document.getElementById('btnRetry').addEventListener('click', function(){
            let stageRepeat = game.stageNumber;
            game.reset();
            beginModal.destroy();
            setTimeout(function() {
                game = new Game(stageRepeat);
            }, 600);
        }); // Recomeça a fase atual
        document.getElementById('modalClose').addEventListener('click', function(event){
            event.preventDefault();
            game.modal.destroy();
            document.getElementById('btnPlay').style.display = 'block';
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