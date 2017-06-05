import * as fs from 'fs'
import OAuth2 from './tsforce/oauth2'
import { Force } from './tsforce/tsforce'
import formatter from './formatter'

export default async function handle(commander: any) {
  let token

  try {
    console.log('Logging in to Salesforce...')
    token = await new OAuth2().auth(commander.instance, commander.username, commander.password)
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }

  let client = new Force(token)
  console.log('Getting coverage...')
  let result = await client.getCoverage()

  console.log('Formatting coverage...')
  let lcovInfo = formatter(result)

  console.log('Coverage folder exist?...')
  let folderExist = fs.existsSync(__dirname + '/coverage/')

  if (!folderExist) {
    console.log('Create coverage?...')
    fs.mkdirSync(__dirname + '/coverage/')
  }

  console.log('Saving coverage...')
  console.log(__dirname)
  fs.writeFileSync(__dirname + '/coverage/lcov.info', lcovInfo)
  console.log('File Saved!')
}
