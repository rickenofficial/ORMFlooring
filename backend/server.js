import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Client from './models/Clients.js';
import Contact from './models/Contacts.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React app URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get("/", (req, res) => {
    res.json({
        message: "🚀 ORM Flooring API funcionando",
        timestamp: new Date().toISOString(),
        status: "online"
    });
});

// API Routes - Clientes
app.get("/api/clients", (req, res) => {
    res.json({
        message: "Lista de clientes",
        clients: [
            { id: 1, name: "Juan Pérez", email: "juan@email.com", phone: "555-0101" },
            { id: 2, name: "María García", email: "maria@email.com", phone: "555-0102" },
            { id: 3, name: "Carlos López", email: "carlos@email.com", phone: "555-0103" }
        ],
        total: 3
    });
});

// Actualizado para manejar mensajes de contacto
app.post("/api/clients", async (req, res) => {
    console.log("📨 Nuevo cliente/contacto recibido:", req.body);

    // Validación básica
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({
            error: "Nombre y email son requeridos"
        });
    }

    const newClient = new Client({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone || "",
        message: req.body.message || ""


    });

    await newClient.save();

    // Log más detallado para el formulario de contacto
    if (req.body.message) {
        console.log("💬 Mensaje de contacto:");
        console.log(`   👤 Nombre: ${req.body.name}`);
        console.log(`   📧 Email: ${req.body.email}`);
        console.log(`   📞 Teléfono: ${req.body.phone || 'No proporcionado'}`);
        console.log(`   💌 Mensaje: ${req.body.message}`);
    }

    res.status(201).json({
        message: "Contacto recibido exitosamente",
        client: newClient,
        success: true
    });
});

// API Routes - Servicios
app.get("/api/services", (req, res) => {
    res.json({
        message: "Lista de servicios",
        services: [
            {
                id: 1,
                name: "Instalación de pisos laminados",
                price: 500,
                description: "Instalación profesional de pisos laminados"
            },
            {
                id: 2,
                name: "Reparación de pisos de madera",
                price: 200,
                description: "Reparación y restauración de pisos de madera"
            },
            {
                id: 3,
                name: "Instalación de alfombras",
                price: 300,
                description: "Instalación profesional de alfombras"
            }
        ],
        total: 3
    });
});

app.post("/api/services", (req, res) => {
    console.log("📨 Nuevo servicio recibido:", req.body);

    // Validación básica
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            error: "Nombre y precio son requeridos"
        });
    }

    const newService = {
        id: Date.now(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        description: req.body.description || "",
        createdAt: new Date().toISOString()
    };

    res.status(201).json({
        message: "Servicio creado exitosamente",
        service: newService
    });
});

// Ruta específica para contactos del formulario web
app.post("/api/contact", async (req, res) => {
    console.log("📞 Formulario de contacto recibido:", req.body);

    // Validación
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.status(400).json({
            error: "Nombre, email y mensaje son requeridos",
            success: false
        });
    }

    try {
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone || "",
            message: req.body.message
        });

        await contact.save();

        // Log detallado
        console.log("🎯 NUEVO CONTACTO GUARDADO EN MONGODB:");
        console.log(`   👤 Cliente: ${contact.name}`);
        console.log(`   📧 Email: ${contact.email}`);
        console.log(`   📞 Teléfono: ${contact.phone || 'No proporcionado'}`);
        console.log(`   💬 Mensaje: ${contact.message}`);
        console.log(`   ⏰ Fecha: ${contact.createdAt}`);

        res.status(201).json({
            message: "¡Gracias por contactarnos! Tu mensaje ha sido guardado.",
            contact,
            success: true
        });
    } catch (error) {
        console.error("❌ Error guardando contacto:", error.message);
        res.status(500).json({
            error: "Error al guardar el contacto",
            message: error.message,
            success: false
        });
    }
});


// Ruta de prueba para verificar POST
app.post("/api/test", (req, res) => {
    console.log("🧪 Datos de prueba recibidos:", req.body);
    res.json({
        message: "POST funciona correctamente",
        dataReceived: req.body,
        timestamp: new Date().toISOString()
    });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        path: req.originalUrl,
        method: req.method
    });
});

// Manejo de errores globales
app.use((error, req, res, next) => {
    console.error("❌ Error:", error.message);
    res.status(500).json({
        error: "Error interno del servidor",
        message: error.message
    });
});

// Conexión a MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🟢 MongoDB conectado: ${conn.connection.host}`);
        console.log(`📊 Base de datos: ${conn.connection.name}`);
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
        console.log("⚠️  Continuando sin MongoDB (usando datos mock)");
        // No hacer process.exit(1) para poder trabajar sin MongoDB inicialmente
    }
};

// Event listeners para MongoDB
mongoose.connection.on('connected', () => {
    console.log('🔗 Mongoose conectado a MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Error de conexión MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔌 Mongoose desconectado');
});

// Iniciar servidor
const startServer = async () => {
    // Intentar conectar a MongoDB pero continuar sin él si falla
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
        console.log(`🌐 API disponible en: http://localhost:${PORT}`);
        console.log(`🧪 Prueba GET: http://localhost:${PORT}/api/clients`);
        console.log(`🧪 Formulario contacto: http://localhost:${PORT}/api/contact`);
        console.log(`📱 Acepta requests desde: http://localhost:3000 y http://localhost:5173`);
    });
};

// Manejo de cierre limpio
process.on('SIGINT', async () => {
    console.log('\n🔄 Cerrando servidor...');
    try {
        await mongoose.connection.close();
        console.log('🔒 Conexión MongoDB cerrada');
    } catch (error) {
        console.log('⚠️  Error cerrando MongoDB:', error.message);
    }
    process.exit(0);
});

startServer();