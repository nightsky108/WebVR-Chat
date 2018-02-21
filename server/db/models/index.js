/*
MODEL INITIALIZER
Uses require() to pass the imports around as a func.
NOTE: Do not change this to ES6, please - loading must be async
*/
export default function loadModels () {
  //  Auth and User data
  require('./config')
  require('./user')
}

/*
RESTful MODELS (and their dummy data generators)
For express-restify-mongoose
*/
import Config, { dummyConfigs } from './config'
import User, { dummyUsers } from './user'
//  Note that users are not here, that's bespoke.
export {
  Config, User
}
export const restDummies = [
  dummyConfigs, dummyUsers
]
