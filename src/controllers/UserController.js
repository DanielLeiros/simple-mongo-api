const User = require('./../models/User');

module.exports = {
    async save(req, res) {
        const user = {  
            nome: req.body.nome,  
            email: req.body.cpf,
            idade: req.body.idade  
        };

        let usuario = await User.findOne({ cpf: user.cpf });

        if(!usuario) {
            usuario = await User.create(user);
            return res.json(usuario);
        } 
        
        return res.json({ "message": "Usuário já cadastrado!"});
    },

    async find(req, res) {
        let usuarios = await User.find();
        return res.json(usuarios);
    },

    async findOne(req, res) {
        await User.findById(req.params.id, (err, user) => {
           return (err) ? res.json({ "message": `Usuário não encontrado para o ${req.params.id} !` }) : res.json(user);
        });
    }
}
