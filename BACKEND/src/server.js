const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 7000;


app.listen(PORT, () => console.log(`Server rodando na porta ${7000}`));
