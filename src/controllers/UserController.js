const User = require('./../models/User');

module.exports = {
    async save(req, res) {
        const newUserData = {  
            nome: req.body.nome,  
            email: req.body.cpf,
            idade: req.body.idade  
        };

        const userFromDb = await User.findOne({ cpf: newUserData.cpf });
  
        return userFromDb 
            ? res.json({ "message": "Usuário já cadastrado!"}) 
            : res.json(await User.create(newUserData));
    },

    async find(req, res) {
        return res.json(await User.find());
    },

    async findOne(req, res) {
        await User.findById(req.params.id, (err, user) => {
           return (err) ? res.json({ "message": `Usuário não encontrado para o ${req.params.id} !` }) : res.json(user);
        });
    }
}
