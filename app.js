const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let carros = [
    { id: 1, marca: 'Toyota', modelo: 'Corolla', ano: 2020, cor: 'Preto', valor: 100000 },
    { id: 2, marca: 'Honda', modelo: 'Civic', ano: 2019, cor: 'Vermelho', valor: 200000},
    { id: 3, marca: 'Ford', modelo: 'Focus', ano: 2018, cor: 'Azul', valor: 500000 }
];


app.get('/carros/por-cor/:cor', (req, res) => {
    const cor = req.params.cor.toLowerCase();
    const carrosPorCor = carros.filter(c => c.cor.toLowerCase() === cor);
    res.json(carrosPorCor);
});

app.get('/carros/valor-total-por-cor/:cor', (req, res) => {
    const cor = req.params.cor.toLowerCase();
    const carrosPorCor = carros.filter(c => c.cor.toLowerCase() === cor);
    const valorTotal = carrosPorCor.reduce((total, carro) => total + carro.valor, 0);
    res.json({ valorTotal });
});



app.get('/carros', (req, res) => {
    res.json(carros);
});

app.get('/carros/:id', (req, res) => {
    const carro = carros.find(c => c.id === parseInt(req.params.id));
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado!' });
    res.json(carro);
});

app.post('/carros', (req, res) => {
    const novoCarro = {
        id: carros.length + 1,
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        cor: req.body.cor,
        valor: req.body.valor
    };
    carros.push(novoCarro);
    res.status(201).json({ message: 'Carro adicionado com sucesso!', carro: novoCarro });
});

app.put('/carros/:id', (req, res) => {
    const carro = carros.find(c => c.id === parseInt(req.params.id));
    if (!carro) return res.status(404).json({ error: 'Carro não encontrado!' });
    carro.marca = req.body.marca || carro.marca;
    carro.modelo = req.body.modelo || carro.modelo;
    carro.ano = req.body.ano || carro.ano;
    carro.cor = req.body.cor || carro.cor;
    carro.valor = req.body.valor || carro.valor;
    res.json({ message: 'Carro atualizado com sucesso!', carro });
});

app.delete('/carros/:id', (req, res) => {
    const carroIndex = carros.findIndex(c => c.id === parseInt(req.params.id));
    if (carroIndex === -1) return res.status(404).json({ error: 'Carro não encontrado!' });
    carros.splice(carroIndex, 1);
    res.json({ message: 'Carro excluído com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
