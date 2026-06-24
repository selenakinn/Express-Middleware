const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl} ${new Date().toISOString()}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)

    if (user) {
      req.user = user
      next()
    } else {
      res.status(404).json({ message: 'kullanıcı bulunamadı' })
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: 'gerekli name alanı eksik' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: 'gerekli text alanı eksik' })
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}