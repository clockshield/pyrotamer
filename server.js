const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
var url = "mongodb+srv://fire:tamer@cluster0.3a4ho.mongodb.net/practice1?retryWrites=true&w=majority";


//=========================
//Connecting to database
//=========================

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    
    //=========================
    //Creating database
    //=========================
    
    const db = client.db('prototype-database-1')
    const pointsCollection = db.collection('points')
    
    //=========================
    //Utilizing set and use functions
    //=========================
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    
    //=========================
    //CRUD functions
    //=========================
    
    //---------------------------------------------------------------------
    
    //reading inputs
    app.get('/', (req, res) => {
      pointsCollection.find().toArray()
        .then(points => {
          res.render('index.ejs', { points: points })
        })
        .catch(/* ... */)
    })
    //posting values
    app.post('/points', (req, res) => {
      pointsCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    //update values
    app.put('/points', (req, res) => {
        console.log(req.body.name)
      pointsCollection.findOneAndUpdate(
        { name: req.body.name },
        {
          $set: {
            name: req.body.name,
            latitude: req.body.latitude,
            longitude: req.body.longitude
            
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {res.redirect('/'),res.json('Success')} )
        .catch(error => console.error(error))
    })
    //listen port
    app.listen(1423, function () {
      console.log(`listening on 1423`)
    })

    //delete value
    app.delete('/points', (req, res) => {
        console.log('sadfasdf')
        pointsCollection.deleteOne({ name: req.body.name })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No point to delete')
          }
          res.json('Deleted point quote')
        })
        .catch(error => console.error(error))
    })
})