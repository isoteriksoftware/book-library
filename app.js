require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const responseHelper = require("express-response-helper");

const http = require("http");
const { validationRules, Book } = require("./src/book.model");
const path = require("path");

// Set time zone
require("set-tz")("Africa/Lagos");

// Configure express
const app = express();

const dbName = app.get("env") === "production" ? "book_library" : "book_library_test";
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbLink = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.hu9ei.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Configure general middlewares

const allowedDomains = [
  "http://localhost:3000",
  "https://imran-book-library.herokuapp.com/",
];
const corsConfig = {
  origin: (origin, callback) => {
    return callback(null, origin);
  },
  methods: "POST, GET, OPTIONS, DELETE, PATCH, PUT",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(responseHelper.helper());
app.options("*", cors(corsConfig));

const validateRequest = (req, res, rules, onSucceed) => {
  const validationResult = rules.validate(req.body, { abortEarly: false });

  if (validationResult.error) {
    res.failValidationError(validationResult.error.details.map(m => m.message.replace(/"/g, '')), 'validation-error');
  }
  else {
    onSucceed();
  }
};

const extractUpdatableModelFieldsFromRequest = (req, updatableModelPath, updatableFields) => {
  const body = req.body;
  const fields = Object.keys(body);
  const updatedFields = updatableFields.filter(field => fields.indexOf(field) !== -1);

  updatedFields.forEach(field => updatableModelPath[field] = body[field]);
  return updatedFields;
};

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get("/api", (req, res) => {
  res.send("Book Library API");
});

app.get("/api/book", async (req, res) => {
  const books = await Book.find();
  return res.respond(books);
});

app.post('/api/book', (req, res) => {
  const handler = async () => {
    const body = req.body;
    // Duplicate errors
    const errors = [];

    let book = await Book.findOne({ isbn: body.isbn });
    if (book)
      errors.push('Book with this isbn exists!');

    if (errors.length > 0)
      return res.failValidationError(errors, "validation-error");
    
    // Extract the required data
    book = new Book();
    const validFields = [
      'title', 'isbn', 'publishYear', 'coverPrice'
    ];
    extractUpdatableModelFieldsFromRequest(req, book, validFields);

    await book.save();
    return res.respondCreated('Book created');
  };

  validateRequest(req, res, validationRules.create, handler);
});

app.get('/api/book/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  
  const book = await Book.findOne({ isbn: isbn });
  if (!book)
    return res.failNotFound('Book not found');
  
  return res.respond(book);
});

app.post('/api/book/checkout/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
    
  // Extract the required data
  const book = await Book.findOne({ isbn: isbn });
  if (!book)
    return res.failNotFound('Book not found');
  
  if (book.status === 'Checked-out')
    return res.failValidationError(['This book is already checked-out']);

  const handler = async () => {
    const checkData = {};
    const validFields = [
      'borrower_name', 'borrower_phone', 'borrower_nid', 'checkout_date', 'return_date'
    ];
    extractUpdatableModelFieldsFromRequest(req, checkData, validFields);

    book.checks.push(checkData);
    book.status = 'Checked-out';
    await book.save();
    return res.respondUpdated('Book checked-out');
  };

  validateRequest(req, res, validationRules.checkout, handler);
});

app.post('/api/book/checkin/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
    
  // Extract the required data
  const book = await Book.findOne({ isbn: isbn });
  if (!book)
    return res.failNotFound('Book not found');
  
  if (book.status === 'Checked-in')
    return res.failValidationError(['This book is already checked-in']);

  const lastCheck = book.checks[book.checks.length - 1];
  if (!lastCheck)
    return res.failServerError();

  const newCheck = {
    borrower_name: lastCheck.borrower_name,
    borrower_phone: lastCheck.borrower_phone,
    borrower_nid: lastCheck.borrower_nid,
    checkout_date: lastCheck.checkout_date,
    return_date: new Date(),
    status: 'Checked-in',
  };

  console.log(newCheck);
  
  book.checks.push(newCheck);
  book.status = 'Checked-in';
  await book.save();

  return res.respondUpdated('Book checked-in');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

app.use((error, _req, res, _next) => {
  console.log(error);
  res.failServerError();
});

app.set("port", process.env.PORT || 5000);

// Connect to the database
mongoose.connect(
  dbLink,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("Failed to connect to database");
      throw error;
    } else {
      console.log(`Connected to MongoDB Successfully`);
    }

    const server = http.createServer(app);

    server.listen(app.get("port"), () => {
      console.log(`Server listening on port ${app.get("port")}`);
    });
  }
);
