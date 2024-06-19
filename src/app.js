import express, { json } from 'express';

const app = express();
app.use(json());

const items = [];

app.post("/items", (req, res) => {
    const item = req.body;

    items.push({
        id: items.length + 1,
        ...item
        });
    res.send("seu item foi adicionado!");
})

// recebe informações
app.get('/items', (req, res) => {
    res.send(items)
    })

// app.get('/?type=nome-do-tipo', (req, res) => {
//     const tipos = [
//         { name: "Laranja" , quantity: 12, type: "fruta" },
//         { name: "Melância" , quantity: 1, type: "fruta" },
//         { name: "Uva" , quantity: 3, type: "fruta" },
//     ]
//     res.send(tipos)
//     })

app.get('/items/:id', (req, res) => {
    const id = req.params.id
    const ItemsPorIds = items.find(item => {
        return item.id == Number(id)
    })
    res.send(ItemsPorIds)
    })



app.listen(5000, () => console.log('port 5000'));