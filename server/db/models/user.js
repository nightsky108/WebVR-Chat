import mongoose from 'mongoose'
import faker from 'faker'

/*
USER SCHEMA:
Data on a certain user, also the information authN passes to client.
NOTE: Populate "stf" to get the committee roles (if any) of a user.
*/
const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  netID: String,
  email: { type: String, lowercase: true },
  /*
  Tokens and the google object are used by Oauth for the google (dev) strategy
  NOTE: These will never actually show up in production.
  */
  tokens: Array,
  google: Object
})
const User = mongoose.model('User', UserSchema)
export default User

/* *****
FAKE DATA GENERATOR: User
******/
const dummyUsers = (min, ids, developer) => {
  //  Check the db for existing data satisfying min required
  User.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Decision schema: ${err}`)
    } else if (count < min) {
      //  If it didn't, inject dummies.
      let fakes = []
      for (let i = 0; i < min; i++) {
        fakes[i] = new User({
          _id: ids.user[i],
          name: faker.name.findName(),
          netID: faker.internet.userName(),
          email: faker.internet.email()
        })
      }
      //  Create a special user for the webdev's profile
      fakes.push(new User({...developer}))
      //  Create will push our fakes into the DB.
      User.create(fakes, (error) => {
        if (!error) { console.log(`SEED: Created fake User (${fakes.length})`) }
      })
    }
  })
}
export { dummyUsers }
