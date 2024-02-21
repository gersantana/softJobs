const express = require('express')
const app = express()
const routes = require('./src/routes/index')
const cors = require('cors')

// defined Port
const PORT = process.env.PORT || 3000 

// midd
app.use(express.json());
app.use(cors());
app.use("/", routes)


app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(500).send('¡Algo salió mal por favor intentar mas tarde!');
  });


// Start server
app.listen( PORT, () => {
    console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`)
})