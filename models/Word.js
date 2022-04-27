import mongoose from 'mongoose';

const WordSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: [true, 'Provide word, please'],
    unique: true,
    trim: true,
    maxlength: [50, 'Word can`t be more than 50 characters']
  },
  translation: {
    type: String,
    required: [true, 'Provide translation, please'],
    trim: true,
    maxlength: [50, 'Word can`t be more than 50 characters']
  },
  example: {
    type: String,
    trim: true,
    maxlength: [300, 'Example can`t be more than 200 characters']
  },
  definition: {
    type: String,
    trim: true,
    maxlength: [300, 'Definition can`t be more than 200 characters']
  },
});

export default mongoose.model('Word', WordSchema);