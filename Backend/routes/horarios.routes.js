const express = require("express")
const mongoose = require("mongoose")
const autenticar = require("../middleware/auth.js");

const router = express.Router()

const horarioSchema = mongoose.Schema({
    tipo: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true,
    }

})

horarioModel = mongoose.model("horario", horarioSchema)

router.post("/", autenticar, async(req, res) =>{
    const newHorario = await horarioModel.create(req.body)
    res.status(201).json(newHorario)
})

router.get("/", autenticar, async(req, res) => {
    const horarioList = await horarioModel.find()
    res.status(200).send(horarioList)
})

router.get("/:data", autenticar, async(req, res) => {
    const { data } = req.params
    const horario = await horarioModel.find({
        data: { $regex: `^${data}` } 
    });
    res.status(200).send(horario)
})  

module.exports = router