import mongoose from 'mongoose'
import faker from 'faker'

/*
CONFIG SCHEMA:
Contains top-level data and enums
that are pre-loaded into ALL routes
There is only one entity for this model

This approach allows us to configure the site
via the config panel and DB SaaS in real time
*/
const ConfigSchema = new mongoose.Schema({
  enums: {
    type: Object,
    default: { A: [], B: [], C: [] }
  }
})
const Config = mongoose.model('Config', ConfigSchema)
export default Config

/* *****
FAKE DATA GENERATOR: Contact
***** */
//  NOTE: Min should = 1
const dummyConfigs = (min, ids) => {
  //  Check the db for existing data satisfying min required
  Config.count().exec((err, count) => {
    if (err) {
      console.warn(`Unable to count Config schema: ${err}`)
    } else if (count < 1) {
      let fakeEnums = [faker.company.bsNoun(), faker.company.bsNoun(), faker.company.bsNoun()]
      let fake = new Config({
        enums: {
          [fakeEnums[1]]: [],
          [fakeEnums[2]]: [],
          [fakeEnums[3]]: []
        }
      })
      Config.create(fake, (error) => {
        if (!error) { console.log(`SEED: Created fake Config scheme`) }
      })
    }
  })
}

export { dummyConfigs }
