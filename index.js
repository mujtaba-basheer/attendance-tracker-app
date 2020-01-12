const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use('/api', routes)

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port} ...`)
})