const express = require('express')
const app = express()
// const routes = require('./src/routes/index')

// defined Port
const PORT = process.env.PORT || 3000 

// routes
// app.use("/", routes)

// Start server
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`)
})