const dotenv = require('dotenv')
const Path = require('path')
dotenv.config()

module.exports = {
    rootPath: Path.resolve(__dirname,'..'),
    serviceName:process.env.SERVICE_NAME,
    jwtkey:process.env.SECRET,
    urlDB: process.env.MONGO_URL
}