const {Router} = require('express')
const userRouter = Router();

userRouter.post('/signup', (req, res) => {
  res.send({
    message: 'User Sign up endpoint'
  })
})

userRouter.post('/signin', (req, res) => {
  res.send({
    message: 'User Sign in endpoint'
  })
})

userRouter.get('/purchases', (req, res) => {
  res.send({
    message: 'User purchases endpoint'
  })
})

module.exports = {
  userRouter: userRouter
}