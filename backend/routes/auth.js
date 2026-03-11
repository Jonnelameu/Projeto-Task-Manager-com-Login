
const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  const hashed = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashed
  })

  res.json(user)
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json("Usuário não encontrado")

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json("Senha inválida")

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.json({ token })
})

module.exports = router
