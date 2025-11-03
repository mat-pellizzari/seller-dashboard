const express = require("express");
const mongoose = require("mongoose");
const autenticar = require("../middleware/auth.js");

const router = express.Router();

const vendaSchema = mongoose.Schema({
    semana: {
        type: Number,
        required: true
    },
    dia: {
        type: Number,
        required: true
    },
    id_produto: {
        type: Number,
        required: true,
    },
    exclusivo: {
        type: Boolean,
        required: true,
    },
    qtd: {
        type: Number,
        required: true,
    },
});

vendasModel = mongoose.model("vendas", vendaSchema);

router.post("/", autenticar, async(req, res) =>{
    const newVenda = await vendasModel.create(req.body);
    res.status(201).json(newVenda);
})
router.get("/", autenticar, async(req, res) => {
    const vendasList = await vendasModel.find().sort({ _id: 1});
    res.status(200).send(vendasList);
})
    
router.get("/:semana", autenticar, async(req, res) => {
    const { semana } = req.params
    const venda = await vendasModel.find({
        semana: semana
    });
    res.status(200).send(venda)
})  

module.exports = router;