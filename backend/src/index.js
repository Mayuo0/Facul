import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'
import path from 'path'

config()

async function main() {
    const hostname = 'localhost'
    const port = 27000

    const app = express()

    const mongoConnection = await Mongo.connect({ mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME })
    console.log(mongoConnection);


    app.use(express.json())
    app.use(cors())

    
    app.use(express.static(path.join(process.cwd(), '..', 'public')))

    
    app.get('/', (req, res) => {
        res.sendFile(path.join(process.cwd(), '..', 'public', 'index.html'))
    })

    // Routes
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)

    app.listen(port, () => {
        console.log(`Server running on: http://${hostname}:${port}`);
    })
}

main()
