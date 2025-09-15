// models/Client.js
import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
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
    message: String, // opcional, si quieres guardar notas o comentarios
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['activo', 'pendiente', 'cerrado'],
        default: 'pendiente'
    }
});

export default mongoose.model('Client', clientSchema);