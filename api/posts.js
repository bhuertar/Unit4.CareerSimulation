const postsRouter = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const prisma  = require('../db');

// Test Route
// postsRouter.get('/', (req, res) => {
//   res.send('<h1>Testing Posts Route</h1>');
// })

// Get Posts Route
postsRouter.get('/', async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.send(allPosts);
  } catch(error) {
    console.log(error);
  }
})

postsRouter.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id*1
      }
    })
    res.send(post);
  } catch(error) {
    console.log(error);
  }
})

module.exports = postsRouter;