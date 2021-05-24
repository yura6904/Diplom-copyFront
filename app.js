const express = require('express');
const config = require('config');
const mogoose = require('mongoose');

const app = express();
app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
const PORT = config.get('port') || 5000

async function start() {
    try {
        await mogoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`APP port = ${PORT}`));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
    
}
start();




//const db = mogoose.connection;
/*
    db.once('open', _=>{
        console.log('Mongo connected')
    })
*/