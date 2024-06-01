const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000


// middlewares
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('classmate is running')
})

app.listen(port, () => {
    console.log(`ClassMate web server is listening on port ${port}`)
})