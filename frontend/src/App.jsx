import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [headerBg, setHeaderBg] = useState('linear-gradient(135deg, #2c3e50, #34495e)');

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const target = document.querySelector(sectionId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          message: formData.mensaje
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        console.log('Cliente guardado:', result);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: ''
        });
      } else {
        const error = await response.json();
        alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
        console.error('Error:', error);
      }
    } catch (error) {
      alert('Error de conexión. Por favor, intenta nuevamente.');
      console.error('Error de conexión:', error);
    }
  };

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderBg('linear-gradient(135deg, #2c3e50ee, #34495eee)');
      } else {
        setHeaderBg('linear-gradient(135deg, #2c3e50, #34495e)');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <header className="header" style={{ background: headerBg }}>
        <div className="nav-container">
          <div className="logo">FloorMaster Pro</div>
          <nav>
            <ul className="nav-menu">
              <li><a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('#inicio'); }}>Inicio</a></li>
              <li><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('#servicios'); }}>Servicios</a></li>
              <li><a href="#nosotros" onClick={(e) => { e.preventDefault(); scrollToSection('#nosotros'); }}>Nosotros</a></li>
              <li><a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('#contacto'); }}>Contacto</a></li>
            </ul>
          </nav>
          <a href="#contacto" className="cta-button" onClick={(e) => { e.preventDefault(); scrollToSection('#contacto'); }}>
            Cotización Gratis
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <h1>Pisos de Calidad Superior</h1>
          <p>Transformamos tu hogar con los mejores pisos del mercado. Instalación profesional, materiales de primera calidad y garantía completa.</p>
          <div className="hero-buttons">
            <a href="#servicios" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('#servicios'); }}>
              Ver Servicios
            </a>
            <a href="#contacto" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('#contacto'); }}>
              Contactar Ahora
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            {[
              {
                icon: '🏠',
                title: 'Pisos Laminados',
                description: 'Instalación profesional de pisos laminados de alta durabilidad y diseños modernos para tu hogar.'
              },
              {
                icon: '🪨',
                title: 'Pisos de Madera',
                description: 'Pisos de madera natural y engineered wood con acabados premium y garantía de por vida.'
              },
              {
                icon: '⚡',
                title: 'Pisos Vinílicos',
                description: 'Soluciones versátiles y resistentes al agua, perfectas para cocinas y baños.'
              },
              {
                icon: '🛠️',
                title: 'Reparación',
                description: 'Reparamos y restauramos pisos existentes devolviendo la belleza original a tu hogar.'
              },
              {
                icon: '📋',
                title: 'Consultoría',
                description: 'Te asesoramos en la elección del piso perfecto según tus necesidades y presupuesto.'
              },
              {
                icon: '🚀',
                title: 'Instalación Rápida',
                description: 'Instalación profesional en tiempo record sin comprometer la calidad del trabajo.'
              }
            ].map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>¿Por Qué Elegirnos?</h2>
              <p>Con más de 15 años de experiencia en la industria de pisos, nos hemos consolidado como líderes en calidad y servicio. Nuestro equipo de expertos se dedica a transformar espacios con los mejores materiales y técnicas de instalación.</p>
              <p>Trabajamos con las marcas más reconocidas del mercado y ofrecemos garantía completa en todos nuestros proyectos. Tu satisfacción es nuestra prioridad número uno.</p>
              <a href="#contacto" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('#contacto'); }}>
                Solicitar Cotización
              </a>
            </div>
            <div className="about-image">
              Imagen de Equipo de Trabajo
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {[
              { number: '500+', text: 'Proyectos Completados' },
              { number: '15+', text: 'Años de Experiencia' },
              { number: '98%', text: 'Clientes Satisfechos' },
              { number: '24/7', text: 'Soporte Técnico' }
            ].map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>{stat.number}</h3>
                <p>{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact">
        <div className="container">
          <h2 className="section-title">Contáctanos</h2>
          <div className="contact-content">
            <div className="contact-form">
              <div>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos sobre tu proyecto..."
                    required
                  />
                </div>
                <button type="button" className="btn-primary" onClick={handleSubmit}>
                  Enviar Mensaje
                </button>
              </div>
            </div>
            <div className="contact-info">
              <h3>Información de Contacto</h3>
              {[
                {
                  icon: '📍',
                  title: 'Dirección:',
                  content: '123 Calle Principal, Ciudad, Estado 12345'
                },
                {
                  icon: '📞',
                  title: 'Teléfono:',
                  content: '(555) 123-4567'
                },
                {
                  icon: '✉️',
                  title: 'Email:',
                  content: 'info@floormasterpro.com'
                },
                {
                  icon: '⏰',
                  title: 'Horarios:',
                  content: 'Lun - Vie: 8:00 AM - 6:00 PM\nSáb: 9:00 AM - 4:00 PM'
                }
              ].map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <strong>{item.title}</strong><br />
                    {item.content.split('\n').map((line, i) => (
                      <span key={i}>{line}{i < item.content.split('\n').length - 1 && <br />}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 FloorMaster Pro. Todos los derechos reservados. | Diseño profesional de pisos</p>
        </div>
      </footer>
    </div>
  );
}

export default App;