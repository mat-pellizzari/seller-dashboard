const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const loginSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    passWd: {
        type: String,
        required: true
    },
});

const loginModel = mongoose.model("login", loginSchema);

router.post("/login", async (req, res) => {
  const { userName, passWd } = req.body;

  const usuario = await loginModel.findOne({ userName });
  if (!usuario) return res.status(401).json({ erro: "Usuário não encontrado" });

  const senhaValida = await bcrypt.compare(passWd, usuario.passWd);
  if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

  const token = jwt.sign(
    { id: usuario._id, userName: usuario.userName },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({ token });
});

module.exports = router;