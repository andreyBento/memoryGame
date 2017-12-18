// Construtor de carta, utilizado para armazenar o nome dos icones e a chave identificadora
const Card = function(name, key){
    this.name = name;
    this.key = key;
    this.template = '<button class="card card-open" disabled data-name="'+ this.name +'">' + '</button>';
}