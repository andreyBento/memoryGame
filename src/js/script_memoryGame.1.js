/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

var Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card" data-name="'+ this.name +'">' + '</button>';
}

var cards = [
    new Card('item1', 1),
    new Card('item2', 2),
    new Card('item3', 3),
    new Card('item4', 4),
    new Card('item5', 5),
    new Card('item6', 6),
    new Card('item7', 7),
    new Card('item8', 8)
];

var pares = [];

for(i = 0; i < cards.length; i++){
    var nome = 'item' + (i + cards.length + 1);
    pares.push(new Card(nome, cards[i].key));
}

var teste = cards.concat(pares);

var teste3 = teste.length;
for(i = 0; i < teste3; i++){
    var teste2 = Math.floor(Math.random() * (teste.length - 0)) + 0;
    document.querySelector('.memory-body').innerHTML += teste[teste2].template;
    teste.splice(teste2, 1);
}

$('.card').each(function(){
    $(this).addClass('card-open');
    $(this).attr('disabled', 'disabled');
    var dataIcone = $(this).data('name');
    for(i = 0; i < cards.length; i++){
        if(dataIcone == cards[i].name){
            if(this.children.length < 1){
                this.innerHTML += '<span class="memory '+ cards[i].name +'"></span>';
            }
        } else if (dataIcone == pares[i].name){
            var iconePar = 'item' + pares[i].key;
            if(this.children.length < 1){
                this.innerHTML += '<span class="memory '+ iconePar +'"></span>';
            }
        }
    }
});
setTimeout(function(){
    $('.card').each(function(){
        $(this).removeClass('card-open');
        $(this).removeAttr('disabled');
        this.innerHTML = '';
    });
}, 2000);

var open = [];

$('.card').click(function(){
    var dataIcone = $(this).data('name');

    // Adiciona classe de abetura na carta e icone interno a ela
    if(!$(this).hasClass('card-open')){
        $(this).addClass('card-open');
        $(this).attr('disabled', 'disabled');
        for(i = 0; i < cards.length; i++){
            if(dataIcone == cards[i].name){
                if(this.children.length < 1){
                    this.innerHTML += '<span class="memory '+ cards[i].name +'"></span>';
                }
                open.push(cards[i].key);
            } else if (dataIcone == pares[i].name){
                var iconePar = 'item' + pares[i].key;
                if(this.children.length < 1){
                    this.innerHTML += '<span class="memory '+ iconePar +'"></span>';
                }
                open.push(pares[i].key);
            }
        }
    }

    // Checa se deu mete
    if(open.length == 2){
        if(open[0] == open[1]){
            $('.card-open').each(function(){
                if(!$(this).hasClass('fail')){
                    $(this).addClass('success');
                    $(this).removeClass('card-open');
                    $(this).attr('disabled', 'disabled');
                }
            });
            open = [];
        } else {
            $('.card-open').each(function(){
                $(this).addClass('fail');
            });
            open = [];
        }
    }

    // remove falha de mete
    if($(this).hasClass('fail')){
        setTimeout(function(){
            $('.fail').each(function(){
                $(this).removeClass('card-open');
                $(this).removeClass('fail');
                $(this).removeAttr('disabled');
            });
        }, 1000);
    }


    // Valida fim de jogo
    var sucesso = $('.success');
    var cartas = $('.card');

    if(sucesso.length == cartas.length){
        alert('Você ganhou!');
    }
});
