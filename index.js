const express = require('express')
const app = express()
const port = 4000
const monk = require('monk')
const url = 'mongodb://jerrberr:noodlehoo@cluster0-shard-00-00-sw87i.mongodb.net:27017,cluster0-shard-00-01-sw87i.mongodb.net:27017,cluster0-shard-00-02-sw87i.mongodb.net:27017/phonebook?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const db = monk(url);
const user = db.get('user')
const cors = require('cors')
const bodyParser = require('body-parser')
db.then(() => {
  console.log('Connected correctly to server')
})

app.use(cors())
app.use(bodyParser.json())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', async function (req, res)  {
const results = await user.find()
res.status(200).send(results)})

app.post('/user', async function (req, res)  {
const body = req.body
const results = await user.insert(req.body)
res.send(results)})

app.put('/user/:id', async function (req, res)  {
const results = await user.findOneAndUpdate(req.params.id,{$set:req.body})
res.send(results)})

app.delete('/user/:_id', async function (req, res)  {
const results = await user.findOneAndDelete(req.params._id)    //this removes specific id.
res.send(results)})

app.delete('/user', async function (req, res)  {  //this removes all
    const results = await user.remove()
    res.send(results)})
    

