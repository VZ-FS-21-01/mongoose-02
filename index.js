require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const Contact = require('./models/contact')

const data = require('./data.json')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


console.log(process.env.DB_URI)

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    Contact.find()
        .then(result => res.render('contacts', { data: result }))
        .catch(err => console.log(err))
})

app.get('/contact/:id', (req, res) => {
    Contact.findById(req.params.id)
        .then(result => res.render('contact', { contact: result }))
        .catch(err => console.log(err))
})

app.get('/contact/:id/delete', (req, res) => {
    console.log(req.params.id)
    Contact.findByIdAndDelete(req.params.id)
        .then(result => res.redirect('/'))
        .catch(err => console.log(err))
})

app.get('/contact/:id/edit', (req, res) => {
    Contact.findById(req.params.id)
        .then(result => res.render('contactEdit', { contact: result }))
        .catch(err => console.log(err))
})
app.post('/contact/:id/edit', (req, res) => {
    // const updatedContact = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     email: req.body.email,
    //     age: req.body.age
    // }
    // Contact.findByIdAndUpdate(req.params.id, updatedContact)
    Contact.findByIdAndUpdate(req.params.id, req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})






app.get("/add-json", (req, res) => {
    // {
    //     "first_name": "Sam",
    //     "last_name": "Burnett",
    //     "email": "sburnett2@princeton.edu",
    //     "age": 78
    // },
    data.forEach(ele => {
        const contact = new Contact({
            firstName: ele.first_name,
            lastName: ele.last_name,
            email: ele.email,
            age: ele.age
        })
        contact.save()
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    })
})

