const express = require("express");
const mongoose = require("mongoose");
const autenticar = require("../middleware/auth.js");

const router = express.Router();

const metaSchema = mongoose.Schema({
    semana: {
        type: Number,
        required: true
    },
    metaKit: {
        type: Number,
        required: true
    },
    metaTm: {
        type: Number,
        required: true,
    },
});

metaModel = mongoose.model("meta", metaSchema);

router.post("/", autenticar, async(req, res) =>{
    const newMeta = await metaModel.create(req.body);
    res.status(201).json(newMeta);
})
    
router.get("/:semana", autenticar, async(req, res) => {
    const { semana } = req.params
    const meta = await metaModel.find({
        semana: semana
    });
    res.status(200).send(meta)
})  

module.exports = router;