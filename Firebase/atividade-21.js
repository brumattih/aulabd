var admin = require("firebase-admin");
var serviceAccount = require("./autenticador.json");
var user = require("readline-sync")
var choice = "";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arbyte-ad165.firebaseio.com"
});

console.log('--------------------------ESCOLHA--------------------------')
console.log("Insira 1 para cadastrar um novo carro")
console.log("Insira 2 para mostrar todos os carros")
console.log("Insira 3 para filtrar pelo valor maior")
console.log("Insira 4 para filtrar pelo valor menor")
console.log("Insira 5 para filtrar pelo valor exato")
console.log("Insira 6 para sair do programa")

choice = user.question("Escolha : ").trim()
var nomeTabelaCarros = 'carros'
var bancoDeDados = admin.database().ref(nomeTabelaCarros);

if (choice == 1) {
  var carroNome = user.question("Digite o nome do carro: ")
  var carroValor = user.question("Digite o valor do carro: ")

  bancoDeDados.push({
    nome: `${carroNome}`,
    valor: `${carroValor}`
  })
} else if (choice == 2) {
  bancoDeDados.orderByChild('valor')
    .on('child_added', (snapshot) => {
      console.log(snapshot.val())
    })
} else if (choice == 3) {
  var maiorValor = user.question("Digite o número para filtrar os carros que possuem o valor maior que: ")
  bancoDeDados.orderByChild('valor').startAt(maiorValor)
    .on('child_added', (snapshot) => {
      console.log(snapshot.val())
    })
} else if (choice == 4) {
  var menorValor = user.question("Digite o número para filtrar os carros que possuem o valor menor que: ")
  bancoDeDados.orderByChild('valor').endAt(menorValor)
    .on('child_added', (snapshot) => {
      console.log(snapshot.val())
    })
} else if (choice == 5) {
  var valorExato = user.question("Digite o número para filtrar os carros que possuem o valor de: ")
  bancoDeDados.orderByChild('valor').equalTo(valorExato)
    .on('child_added', (snapshot) => {
      console.log(snapshot.val())
    })
} else if (choice == 6) {
  console.log("Programa encerrado!")
  process.exit()
}