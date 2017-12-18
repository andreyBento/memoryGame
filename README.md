# memoryGame

Os arquivos desse projeto fazem referência a:

### Jogo da Memória : *Memor.it*
### Desenvolvido por : *Andrey(dono deste repositório)*

Projeto desenvolvido com a intenção de praticar conhecimentos de Javascript adquiridos no **_nanodegree de Web designer Avançado da Udacity_**.

Tecnologias usadas no projeto :

- Sass
- Gulp
- Git
- Node.js

Funções de acesso a tecnologia Gulp :
```
npm run gulp server *(starta o servidor remoto)*
npm run gulp build *(compila o projeto)*
npm run gulp sass *(roda apenas a tarefa de conversão de sass em css)*
```
:+1: Este jogo está online: [Memor.it](http://www.mirabolia.com/memorit/index.html)

### O jogo Memor.it funciona da seguinte maneira:

Você possui 4 fases com niveis diferentes de quantidade de cartas, cada fase deve ser solucionada simplesmente clicando em duas cartas para verificar se elas são pares iguais, caso elas não sejam o jogo irá fechar as cartas, após cada nível você pode salvar seu progresso, este progresso pode ser visto no ranking que fica ao lado jogo, mas que só irá aparecer quando você fizer seu primeiro save, também após cada fase você poderá continuar ou parar o seu jogo onde está, quando conluído o jogo você poderá recomeça-lo da primeira fase. Em toda e qualquer fase o contador de tempo possui uma função importante, pois se você chegar a 5min de jogo o tempo acaba e você terá que refazer a fase atual.