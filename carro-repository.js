var db = require('./db')

module.exports = function (database) {
    return {
        criaTabela: async function () {
            return new Promise(async (resolve, reject) => {
                await database.run('CREATE TABLE IF NOT EXISTS Carros(nome text, cor text, ano integer, valor integer)');
                resolve()
            })
        },
        insereCarro: async function (carro) {
            return new Promise(async (resolve, reject) => {
                await database.run(`INSERT INTO Carros(nome, cor, ano, valor) VALUES(?, ?, ?, ?)`, [carro.nome, carro.cor, carro.ano, carro.valor], function (err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`Carro inserido com sucesso linha ${this.lastID}`);
                    resolve(this.lastID)
                });
            })

        }
        ,
        excluiCarro: async function (nome) {
            return new Promise(async (resolve, reject) => {
                await database.run(`DELETE FROM Carros WHERE nome=?`, nome, function (err) {
                    if (err) {
                        return reject(err)
                    }
                    console.log(`Carro excluído com sucesso linha ${this.lastID}`);

                    resolve(this.lastID)
                });
            })

        }
        ,
        mostraCarros: async function () {
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = `SELECT * FROM Carros`;
                await database.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome: row.nome,
                            cor: row.cor,
                            ano: row.ano,
                            valor: row.valor

                        })
                    });
                    resolve(carros)
                });
            })
        }
        ,
        mostraMaisCaro: async function () {
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = `SELECT nome, MAX(valor) as valor FROM Carros`;
                await database.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome: row.nome,
                            valor: row.valor

                        })
                    });
                    resolve(carros)
                });
            })
        }
        ,
        mostraMaisBarato: async function () {
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = `SELECT nome, MIN(valor) as valor FROM Carros`;
                await database.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome: row.nome,
                            valor: row.valor

                        })
                    });
                    resolve(carros)
                });
            })
        }
        ,
        ordenaPrecoDesc: async function () {
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = `SELECT * FROM Carros ORDER BY valor DESC`;
                await database.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome: row.nome,
                            cor: row.cor,
                            ano: row.ano,
                            valor: row.valor

                        })
                    });
                    resolve(carros)
                });
            })
        }
        
    }
}