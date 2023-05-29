const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/books', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({ message: 'Livre ajouté'})
    next();
});

app.get('/api/books', (req, res, next) => {
    const books = [
        {
            userId: 'jpozeo69g',
            title: 'Your soul is a river',
            author: 'Nikita Gill',
            imageUrl: 'https://images.unsplash.com/photo-1511108690759-009324a90311?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
            year: 5,
            genre: 'Fantastique',
            ratings: [
                {
                    userId: 'jpozeo69g',
                    grade: 3,
                },
            ],
            averageRating: 3
        }
    ]
    res.status(200).json(books)
})

module.exports = app;