// Construtor do ranking
const Ranking = function(){
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
    this.buttonsArray = document.querySelectorAll('.btn-dropdown');
    for(i = 0; i < this.buttonsArray.length; i++){
        this.buttonsArray[i].addEventListener('click', function(){
            this.booleanCheck = false;
            let itemClasses = this.classList;
            for(j = 0;j < itemClasses.length; j++){
                if(itemClasses[j] == 'active'){
                    this.booleanCheck = true;
                }
            }
            if(this.booleanCheck){
                this.booleanCheck = false;
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
        });
    }
}