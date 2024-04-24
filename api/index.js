const apiRouter = require('express').Router();

// Test Route
apiRouter.get('/', (req, res) => {
  res.send('<h1>Testing Api Route</h1>');
})

// Setting Up Route
const postsRouter = require('./posts.js');
apiRouter.use('/posts', postsRouter);

module.exports = apiRouter;