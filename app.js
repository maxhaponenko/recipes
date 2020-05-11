const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.routes');
const dashboardRouter = require('./routes/dashboard.routes');
const adminIngredeintsRouter = require('./routes/admin/ingredients.routes')

const cors = require('cors');


const app = express()


app.use(cors());
app.use(bodyParser.json())

app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/admin', adminIngredeintsRouter)

const PORT = config.get('port') || 5001
const mongoUri = config.get('mongoUri')

async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        var db = mongoose.connection
        // console.log(db)
        app.listen(PORT, () => { console.log('App has been started on port: ' + PORT) })
    } catch (e) {
        console.log('(!) Server error |--> ' + e.message + ' <--|')
        process.exit(1)
    }
}

start()


