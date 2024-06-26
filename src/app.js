import express, { json } from 'express';

const app = express();
app.use(json());

// array que recebe a listagem de items
const items = [];

// recebe os dados do 'item' inserido pelo usuário para a array 'items'
app.post("/items", (req, res) => {
    const NewItem = req.body;
    
    if (!NewItem.name || !NewItem.quantity || !NewItem.type) {
        res.status(422).send('As informações não foram enviadas corretamente!');
        return;
    }  
    else if (items.some(item => item.name == NewItem.name)) {
        res.status(409).send('Já existe um item com o mesmo nome!');
        return;
    } else {
        items.push({
        id: items.length + 1,
        ...NewItem
        });
        return res.status(201).send("Seu item foi adicionado!");
    }       
})

// recebe todos os items
app.get('/items', (req, res) => {
    // app.get('items?type=nome-do-tipo')
    // filtra a lista por tipos de mercadoria
    const { type } = req.query;

    if (type) {
       const filtroType = items.filter(item => {
            return item.type.includes(type);
        })
       return res.send(filtroType);
    }

    // app.get('/items')
        res.send(items)
    })

// pega o item pelo Id
app.get('/items/:id', (req, res) => {
    const id = req.params.id
    const NumeroId = Number(id);
    console.log(NumeroId);
    const ItemsPorIds = items.find(item => {
        return item.id == Number(id)
    })

    if (Number.isInteger(NumeroId) && NumeroId > 0 == false) {
        return res.sendStatus(400);
    } else if (ItemsPorIds == null) {
        return res.sendStatus(404);
    }   else {
        return res.send(ItemsPorIds);
    }
    })



app.listen(5000, () => console.log('port 5000'));