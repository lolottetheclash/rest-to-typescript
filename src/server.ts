import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import wilderController from './controllers/wilder';
import { MongoError, isMongoError } from './errors/MongoError';
import { InputError, isInputError } from './errors/InputError';

const app = express();

// Database
mongoose
  .connect('mongodb://127.0.0.1:27017/wilderdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to database'))
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.log(err.message));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/wilders', asyncHandler(wilderController.create));
app.get('/api/wilders', asyncHandler(wilderController.read));
app.put('/api/wilders/:id', asyncHandler(wilderController.update));
app.delete('/api/wilders/:id', asyncHandler(wilderController.delete));

app.get('*', (req, res) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong adress' });
});

app.use(
  (
    error: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
  ) => {
    if (isMongoError(error)) {
      switch (error.code) {
        case 11000:
          res.status(400);
          res.json({ success: false, message: 'The name is already used' });
          break;
        default:
          res.status(400);
          res.json({ success: false, message: 'We got a Mongo error....' });
      }
    } else if (isInputError(error)) {
      const errorMessages = error.validationErrors.map(
        (err) => err.constraints
      );
      res.status(400);
      res.json({ success: false, message: errorMessages });
      // error.validationErrors.map((err) => console.log(err.constraints));
      // console.log('lalala INPUT error', error.validationErrors[0].constraints);
    } else {
      res.status(400);
      res.json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Start Server
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on 5000'));
