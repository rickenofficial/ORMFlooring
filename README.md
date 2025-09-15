# 🛠️ ORM Flooring & Services – Backend API

This repository contains the backend for the ORM Flooring & Services LLC client management, services, and contact platform. Built with **Node.js**, **Express**, and **MongoDB**, and designed to scale with ease.

---

## 🚀 Technologies Used

- Node.js + Express
- MongoDB + Mongoose
- dotenv for secure configuration
- CORS for frontend connection
- Nodemon for hot development

---

## 📦 Project Structure

```
backend/
├── models/
│   ├── Client.js       # Active clients
│   └── Contact.js      # Web form leads
├── server.js           # Main backend file
├── .env                # Environment variables (not included in repo)
├── .gitignore          # Ignores node_modules, .env, etc.
```

---

## 🔌 Available Endpoints

### 🌐 Base
- `GET /` → Verify API is online

### 👥 Clients
- `GET /api/clients` → Client list (mock for now)
- `POST /api/clients` → Create new client

### 📞 Contacts
- `POST /api/contact` → Save web form message
- `GET /api/contacts` → List all received contacts

### 🧰 Services
- `GET /api/services` → List of offered services
- `POST /api/services` → Create new service

### 🧪 Test
- `POST /api/test` → Test route to verify POST

---

## ⚙️ How to Run the Project Locally

1. Clone the repository:
```bash
git clone https://github.com/rickenofficial/ORMFlooring.git
cd ORMFlooring/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your MongoDB URI:
```
MONGO_URI=your-secure-uri-here (stored in .env file)
PORT=5000
```

4. Start the server:
```bash
npm run dev
```

---

## 📁 Important Notes

- The `data/db/` folder was excluded from the repository as it contains MongoDB internal files.
- This backend is ready to connect with a React frontend (located in `/frontend` if using a single repository).
- GitHub LFS is recommended if you need to handle large files in the future.
---

# 🛠️ ORM Flooring & Services – Backend API

Este repositorio contiene el backend para la plataforma de gestión de clientes, servicios y contactos de ORM Flooring & Services LLC. Está construido con **Node.js**, **Express**, y **MongoDB**, y diseñado para escalar con facilidad.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB + Mongoose
- dotenv para configuración segura
- CORS para conexión con frontend
- Nodemon para desarrollo en caliente

---

## 📦 Estructura del proyecto
```
backend/
├── models/
│   ├── Client.js       # Clientes activos
│   └── Contact.js      # formulario lead de la web
├── server.js           # Acchivo main del backend
├── .env                # variables de entorno (no incluidas en el repositorio)
├── .gitignore          # Ignores node_modules, .env, etc.
```
---

## 🔌 Endpoints disponibles

### 🌐 Base
- `GET /` → Verifica que la API esté online

### 👥 Clientes
- `GET /api/clients` → Lista de clientes (mock por ahora)
- `POST /api/clients` → Crear nuevo cliente

### 📞 Contactos
- `POST /api/contact` → Guardar mensaje del formulario web
- `GET /api/contacts` → Listar todos los contactos recibidos

### 🧰 Servicios
- `GET /api/services` → Lista de servicios ofrecidos
- `POST /api/services` → Crear nuevo servicio

### 🧪 Test
- `POST /api/test` → Ruta de prueba para verificar POST

---

## ⚙️ Cómo correr el proyecto localmente

1. Clona el repositorio:

```bash
git clone https://github.com/rickenofficial/ORMFlooring.git
cd ORMFlooring/backend
```


```bash
npm install
```
- Crea un archivo .env con tu URI de MongoDB:
```
MONGO_URI=your-secure-uri-here (stored in .env file)
PORT=5000
```

iniciar servidor: 

``` bash
npm run dev
```

Notas importantes
- La carpeta data/db/ fue excluida del repositorio por contener archivos internos de MongoDB.
- Este backend está listo para conectarse con un frontend en React (ubicado en /frontend si usas un solo repositorio).
- Se recomienda usar GitHub LFS si necesitas manejar archivos grandes en el futuro.

Perfecto, Ricardo. Aquí tienes un borrador profesional para tu archivo , adaptado a tu proyecto ORM Flooring & Services con backend en Express y MongoDB:


backend/ ├── models/ │   ├── Client.js       # Clientes activos │   └── Contact.js      # Leads del formulario web ├── server.js           # Archivo principal del backend ├── .env                # Variables de entorno (no incluido en el repo) ├── .gitignore          # Ignora node_modules, .env, etc.

2. 	Instala dependencias:

3. 	Crea un archivo  con tu URI de MongoDB:

4. 	Inicia el servidor:


📁 Notas importantes
• 	La carpeta  fue excluida del repositorio por contener archivos internos de MongoDB.
• 	Este backend está listo para conectarse con un frontend en React (ubicado en  si usas un solo repositorio).
• 	Se recomienda usar GitHub LFS si necesitas manejar archivos grandes en el futuro.

📬 Contacto

Desarrollado por Ricardo Rodriguez
Para soporte técnico o colaboraciones, contáctame vía el formulario web o por GitHub.
