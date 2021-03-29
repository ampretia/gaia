//
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv');

let envFilePath = path.resolve(process.cwd(), '.env');
let envFileContents = fs.readFileSync(envFilePath);
let currentEnv = dotenv.parse(envFileContents);
console.log(currentEnv);