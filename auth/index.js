const authRouter = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register Route
authRouter.post('/register', async(req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, process.env.SALT*1)
      }
    })

    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.status(201).send({ token });
  } catch(error) {
    next(error);
  }
})

// Login Route
authRouter.post('/login', async(req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    })

    if(!user) {
      return res.status(401).send('Invalid Credentials');
    }
    const passwordValidation = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValidation) {
      return res.status(401).send('Invalid Credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT);
    res.send({ token });
  } catch(error) {
    next(error)
  }
})

module.exports = authRouter;