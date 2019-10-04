const User = require('./../models/User');

const save = async (req, res) => {
    const newUserData = {  
        nome: req.body.nome,  
        email: req.body.cpf,
        idade: req.body.idade  
    };

    const userFromDb = await User.findOne({ cpf: newUserData.cpf });

    return userFromDb 
        ? res.json({ "message": "Usuário já cadastrado!"}) 
        : res.json(await User.create(newUserData));
}

const find = async (req, res) => {
    return res.json(await User.find());
}

const findOne = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.json({ "message": `Usuário não encontrado para o ${req.params.id} !` });
    return res.json(user);
}

module.exports = { save, find, findOne }
