import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  text: { type: String, required: true },
  fontSize: { type: String, required: true },
  color: { type: String, required: true },
  uniqueKey: { type: String, required: true, unique: true },  
}, { timestamps: true });

const Word = mongoose.models.Word || mongoose.model('Word', wordSchema);

export default Word;