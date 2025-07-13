const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json()); // Necesario para leer JSON en el body

app.use('/api', require('./routes/user.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

