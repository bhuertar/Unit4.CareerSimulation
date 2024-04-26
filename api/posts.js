const postsRouter = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get Posts Route
postsRouter.get('/', async (req, res, next) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.send(allPosts);
  } catch(error) {
    next(error);
  }
})

postsRouter.get('/:id', async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.id*1
      }
    })
    res.send(post);
  } catch(error) {
    next(error);
  }
})

module.exports = postsRouter;