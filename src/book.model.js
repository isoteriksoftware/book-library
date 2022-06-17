const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publishYear: {
    type: String,
    required: true
  },
  coverPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Checked-in', 'Checked-out'],
    default: 'Checked-in'
  },
  checks: [{
    type: new mongoose.Schema({
      borrower_name: {
        type: String,
        required: true
      },
      borrower_phone: {
        type: String,
        required: true
      },
      borrower_nid: {
        type: String,
        required: true
      },
      checkout_date: {
        type: Date,
        required: true
      },
      return_date: {
        type: String,
        required: true
      }
    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }),
}],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

exports.validationRules = {
  create: joi.object({
    title: joi.string().max(50).required(),
    isbn: joi.string().required(),
    publishYear: joi.string().max(4).required(),
    coverPrice: joi.number().required(),
  }),
  checkout: joi.object({
    borrower_name: joi.string().max(50).required(),
    borrower_phone: joi.string().required(),
    borrower_nid: joi.number().required(),
    checkout_date: joi.date().required(),
    return_date: joi.date().required(),
  }),
};

exports.Book = mongoose.model('Book', schema);