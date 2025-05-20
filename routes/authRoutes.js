
const express = require("express");
const { register, login, getAllUsers } = require("../controllers/authControllers");
const router = express.Router();


router.get("/users", getAllUsers); // Rota GET para listar usuários

router.post("/register", register);
router.post("/login", login);

module.exports = router;