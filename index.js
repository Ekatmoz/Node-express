const express = require('express');
const app = express();
const items = require('./Items')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

console.log(items)

app.get('/api/shop', (req, res) => {
  res.json(items);
})

app.post('/api/shop', (req, res) => {
  const newItem = {
    name: req.body.name,
    id: req.body.id,
    price: req.body.price
  }
  items.push(newItem);
  res.json(items);
})

app.delete('/api/shop/:id', (req, res) => {
  let { id } = req.params;
  let itemToBeDeleted = items.find(item => item.id === id)

  if (itemToBeDeleted) {
    res.json({
      message: 'Item deleted',
      items: items.filter(item => item.id !== id)
    })
  } else {
    res.status(404)
    .json({message: `The item you are looking for doesn't exist`});
  }
})

app.put('/api/shop/:name', (req, res) => {
  let { name } = req.params;
  let itemToBeUpdated = items.find(item => item.name === name)

  if (itemToBeUpdated) {
    let updatedItem = req.body;
    items.forEach(item => {
      if(item.name === req.params.name) {
        item.name = updatedItem ? updatedItem.name : item.name;
        item.id = updatedItem ? updatedItem.id : item.id;
        item.price = updatedItem ? updatedItem.price : item.price;
        res.json({message: `Item updated`, item})
      }
    })
  } else {
    res.status(404)
    .json({message: `Item you are looking for ${req.params.name} doesn't exist`})
  }
})


app.listen(4000, () => {
  console.log(`It's working - PORT 4000`)
})