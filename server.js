require('dotenv').config();
const app = require('./app');
const { db } = require('./database/db');
const initModel = require('./models/initModels');

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

initModel();

db.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
