#!/usr/bin/env node
import * as fs from 'fs'
import * as commander from 'commander'
import handler from './handler'

commander
  .version('0.1.0')
  .option('-i, --instance [instance]', 'Salesforce instance (default: https://login.salesforce.com)', 'https://login.salesforce.com')
  .option('-u, --username [username]', 'Salesforce username')
  .option('-p, --password [password]', 'Salesforce password')
  .parse(process.argv)

if (process.env.APEXCOV_INSTANCE) {
  commander.instance = process.env.APEXCOV_INSTANCE
}

if (!commander.username && process.env.APEXCOV_USERNAME) {
  commander.username = process.env.APEXCOV_USERNAME
}

if (!commander.password && process.env.APEXCOV_PASSWORD) {
  commander.password = process.env.APEXCOV_PASSWORD
}

// Output Help on Default
if (!commander.username && !commander.password) {
  commander.outputHelp()
  process.exit()
}

// Initializing for handler
if (!commander.instance) {
  commander.instance = 'https://login.salesforce.com'
}

if (!commander.username) {
  console.error('You must provide a username')
  process.exit(1)
} else if (!commander.password) {
  console.error('You must provide a password')
  process.exit(1)
}

handler(commander)
