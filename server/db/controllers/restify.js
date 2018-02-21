import restify from 'express-restify-mongoose'
// import _ from 'lodash'

import { Router } from 'express'

export default class Restify {
  constructor (model) {
    //  Assign model
    this.model = model
    //  express-restify-mongoose configurations - common to all controllers
    this.config = {
      prefix: '',
      version: '/v2',
      name: this.model.modelName.toLowerCase(),
      //  Disabling these allows middleware to be called
      // findOneAndUpdate: false,
      // findOneAndRemove: false,
      access: (req) => 'private',
      outputFn: (req, res) => {
        const { statusCode, result } = req.erm
        res.status(statusCode).json(result)
      },
      onError: (err, req, res, next) => {
        const { message } = err
        const { statusCode } = req.erm
        console.error(`ERM:  ${err}`)
        res.status(statusCode).json({ message })
        next()
      }
    }
    //  Middleware = override this!
    this.middleware = { ...this.config }
  }
  API () {
    const router = new Router()
    restify.serve(router, this.model, this.middleware)
    console.log(`REST: Instantiated controller: ${this.config.name}`)
    return router
  }
}
