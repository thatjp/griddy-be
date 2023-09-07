const express = require('express');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const colors = require('colors');
const fileUploader = require('express-fileupload');
const cookieParser = require('cookie-parser');
const queryType = require('query-types');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({ path: '.env' });

const publicPath = path.join(__dirname, '..', 'build');

connectDB();

const auth = require('./routes/auth');
const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions'
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(fileUploader());

app.use(cookieParser());

app.use(queryType.middleware());

app.use(express.static(publicPath));
app.use(session({secret: 'test secret', resave: false, saveUninitialized: false, store: store}))

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/todos', todos);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.bold.red);
  server.close(() => process.exit(1));
});
