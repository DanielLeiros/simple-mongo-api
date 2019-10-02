const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: String,
    cpf: Number,
    idade: Number
});

module.exports = mongoose.model('User', UserSchema);