const express = require("express");
const mongoose = require("mongoose");
const autenticar = require("../middleware/auth.js");

const router = express.Router();

const produtoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    valorUt: {
        type: Number,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    qtd: {
        type: Number,
        required: true, 
    },
    _id: {
        type: Number,
        required: true,
    },

});

produtoModel = mongoose.model("produto", produtoSchema);

router.post("/", autenticar, async(req, res) =>{
    const newProduto = await produtoModel.create(req.body);
    res.status(201).json(newProduto);
})
router.get("/", autenticar, async(req, res) => {
    const produtosList = await produtoModel.find().sort({ _id: 1});
    res.status(200).send(produtosList);
})
    

module.exports = router;