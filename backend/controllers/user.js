const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

require('dotenv').config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

exports.signup = (req, res, next) => {

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    const password  = req.body.password;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: 'Le mot de passe doit contenir au moins 8 caratères, une lettre minuscule, une lettre majuscule et un chiffre'
        })
    };

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                           return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    SECRET_TOKEN,
                                    { expiresIn: '24h' }
                                )
                            });
                        };
                    })
                    .catch(error => res.status(500).json({ error }));
            };
        })
        .catch(error => res.status(500).json({ error }));
};