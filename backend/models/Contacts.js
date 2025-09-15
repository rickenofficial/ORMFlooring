// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo inválido']
  },
  phone: {
    type: String,
    match: [/^\+?[0-9\s\-]{7,15}$/, 'Teléfono inválido'],
    default: ''
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  source: { type: String, default: 'contact_form' }
});

export default mongoose.model('Contact', contactSchema);