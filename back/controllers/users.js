const bcrypt = require("bcrypt");
const User = require("../models/Users");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.getAllUser = (req, res, next) => {
    User.find()
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(500).json({ error }));
};
