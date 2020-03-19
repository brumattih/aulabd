var readline = require('readline-sync')
var carro_repositorio = require('./carro-repository')
const cTable = require('console.table');
var db = require('./db')

db.getDb().then(async database => {
    var choice = "";
    var repositorio = carro_repositorio(database);
    do {
        console.log('--------------------------ESCOLHA--------------------------')
        console.log("Insira A para inserir")
        console.log("Insira B para mostrar")
        console.log("Insira C para deletar")
        console.log("Insira D para mostrar o veículo mais caro")
        console.log("Insira E para mostrar o veículo mais barato")
        console.log("Insira F para ordernar por preço")
        console.log("Insira Z para sair")
        choice = await readline.question("Escolha : ").toUpperCase().trim()
        if (choice === "A") {
            console.clear()
            console.log('--------------------------CADASTRO CARRO--------------------------')
            var carro = {
                nome: readline.question("Insira nome do carro: "),
                cor: readline.question("Insira a cor do carro: "),
                ano: readline.questionInt("Insira o ano do carro: "),
                valor: readline.questionInt("Insira o valor do carro: ")
            }
            await repositorio.insereCarro(carro).then(p => {
                console.clear()
                console.log("Carro inserido com sucesso")
            }).catch(p => {
                console.log("Não foi possível inserir o carro")
            })
        } else if (choice === "B") {
            console.clear()

            await repositorio.mostraCarros().then(p => {
                console.table(p)
            })
        } else if (choice === "C") {
            console.clear()
            console.log('--------------------------EXCLUSÃO CARRO--------------------------')
            var nome = readline.question("Insira nome do carro: ")
            console.log(nome)
            await repositorio.excluiCarro(nome).then(p => {
                console.clear()
                console.log("Carro excluído com sucesso")
            }).catch(p => {
                console.log("Não foi possível excluir o carro")
            })
        } else if (choice === "D") {
            console.clear()
            console.log('--------------------------CARRO MAIS CARO-------------------------')
            await repositorio.mostraMaisCaro().then(p => {
                console.table(p)
            })
        } else if (choice === "E") {
            console.clear()
            console.log('--------------------------CARRO MAIS BARATO-------------------------')
            await repositorio.mostraMaisBarato().then(p => {
                console.table(p)
            })
        } else if (choice === "F") {
            console.clear()
            console.log('--------------------------ORDENADOS PELO PREÇO-------------------------')
            await repositorio.ordenaPrecoDesc().then(p => {
                console.table(p)
            })
        } else if (choice === "Z") {
            break
        } else if (choice !== "Z") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }



    } while (choice)
});