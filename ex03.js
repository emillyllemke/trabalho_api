/**
 * Configurações iniciais
 */

const express = require('express');
const app = express();
const port = 3000;

//Indica ao servior que iremos trabalhar com JSON 
app.use(express.json());

/*
    Simula um banco de dados
*/
let items = [
    { id: 1, name: "Engenharia de Software" },
    { id: 2, name: "Sistemas de Informação" },
];

/**
 * 
 * Endpoint para buscar os dados da lista
 * 
 */


app.get('/item', (req, res) => {
    res.status(200).json(items);
});

app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: "Item não encontrado" });
    }
});

app.post('/item', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.length < 3) {
        res.status(400).json({ mensage: "O campo name deve ser fornecido e conter pelos menos 3 caracteres." });
    } else {
        //os arrays tem uma propriedade chamada length... essa propriedade calcula o tamanho
        //do meu vetor e retorna ele em formato de inteiro...
        const newItem = { id: items.length + 1, ...req.body };
        //push insere um novo item no vetor...
        items.push(newItem);
        res.status(201).json(newItem);
    }
});

//vamos passar como parametro na chamada o id do objeto que irá ser excluido
app.delete('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        //desafio remover o item do array
        items.splice(index, 1);
        res.status(200).json({ mensage: "Item removido!" });
    } else {
        res.status(404).json({ mensage: "Item não encontrado" });
    }
});

app.put('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items[index] = { id, ...req.body }
        res.status(200).json(items[index]);
    } else {
        res.status(404).json({ message: "Item não encontrado!" });
    }

});

app.patch('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    const { name } = req.body;

    if (!item) {
        res.status(400).json({ mensage: "Item não encontrado." });
    } else if (!name || typeof name !== "string" || name.length < 3){
        res.status(400).json({message: 'O campo do nome deve ser fornecido e conter pelo menos 3 caracteres'})
    } else{
        item.name = name
        res.status(200).json(item)  
    }
});

app.listen(port, () => {
    console.log(`O servidor está rodando em http://localhost:${port}`);
})
