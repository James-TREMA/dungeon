import { dataSource } from './database'
import { router } from './routes'
import express from 'express'
import 'dotenv/config'

const app = express()

app.use('/api', router)

dataSource.initialize()

app.listen(process.env.PORT, () => {
    console.log(`Server running on: ${process.env.PORT}`)
})