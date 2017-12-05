/*!
 * Memory Game
 * Desenvolvido por Andrey da Costa
 */

var Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<div class="card" data-name="'+ this.name +'">' + '</div>';
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

var teste = [];

$('.card').click(function(){
    var icone = $(this).data('name');

    // Adiciona classe de abetura na carta e icone interno a ela
    if(!$(this).hasClass('card-open')){
        $(this).addClass('card-open');
        for(i = 0; i < cards.length; i++){
            if(icone == cards[i].name){
                this.innerHTML += '<span class="memory '+ icone +'"></span>';
            } else if (icone == pares[i].name){
                var iconePar = 'item' + pares[i].key
                this.innerHTML += '<span class="memory '+ iconePar +'"></span>';
            }
        }
    }

    $('.card').each(function(){
        if($(this).hasClass('card-open')){
            var that = $(this);
            for(i = 1; i < teste.length; i++){

                for(j = 0; j < cards.length; j++){

                    if($(that).data('name') == cards[j].name){
                        var keyAtual = cards[j].key;
                        console.log(keyAtual);
                    } else if (icone == pares[j].name){
                        var keyAtual = pares[j].key;
                        console.log(keyAtual);
                    }

                }

            }
            teste.push($(this));
        }
    });

});
