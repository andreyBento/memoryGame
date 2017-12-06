/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

var Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card" data-name="'+ this.name +'">' + '</button>';
}

Card.prototype.validate = function(){

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

var keyPar = 1;
for(i = 0; i < cards.length; i++){
    var nome = 'item' + (i + cards.length + 1);
    var par = new Card(nome, keyPar);
    document.querySelector('.memory-body').innerHTML += cards[i].template + par.template;
    keyPar++;
    pares.push(par);
}

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
                $(this).addClass('success');
                $(this).removeClass('card-open');
                $(this).attr('disabled', 'disabled');
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
    var teste = $('.success');
    var teste2 = $('.card');

    if(teste.length == teste2.length){
        alert('Você ganhou!');
    }
});
