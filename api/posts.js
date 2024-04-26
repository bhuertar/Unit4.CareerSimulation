const postsRouter = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get Post Routes
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

// Signed In Routes
postsRouter.use('/', (req, res, next) => {
  if(!req.user) {
    return res.status(401).send('You must be logged in to do that');
  }
  next();
})

postsRouter.post('/', async(req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
      }
    })
    res.status(201).send(post);
  } catch(error) {
    next(error);
  }
})

postsRouter.put('/:id', async(req, res, next) => {
  try {
    const post = await prisma.post.update({
      data: {
        title: req.body.title,
        content: req.body.content
      },
      where: {
        id: req.params.id*1,
        userId: req.user.id
      }
    })
    res.status(201).send(post);
  } catch(error) {
    next(error);
  }
})


postsRouter.delete('/:id', async(req, res, next) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: req.params.id*1,
        userId: req.user.id
      }
    })
    res.status(201).send(post);
  } catch(error) {
    next(error);
  }
})




module.exports = postsRouter;