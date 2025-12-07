import React, { useState } from 'react';
import { 
  CheckCircle, 
  FileText, 
  Calculator, 
  Users, 
  Shield, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  ArrowRight,
  Heart,
  Headphones,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * Conexión con el Backend:
 * 
 * 1. Endpoint principal: https://asesoriasnab.cl/send
 *    - Método: POST
 *    - Recibe: { nombre, correo, tipoEmprendimiento, mensaje }
 *    - Respuesta exitosa: status 200
 * 
 * 2. Integración WhatsApp:
 *    - URL: https://wa.me/+56989164896
 *    - Parámetro text: mensaje predefinido
 * 
 * 3. Flujo de datos:
 *    - El formulario captura los datos en formData
 *    - handleSubmit() envía al backend
 *    - 5 segundos de feedback visual (isSubmitted)
 *    - El backend procesará el correo usando el destinatario predeterminado
 */

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tipoEmprendimiento: '',
    mensaje: '',
    destinatario: 'noreply@asesoriasnab.cl' // correo predeterminado
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función que maneja la conexión al backend / Implementación principal conexión backend
  // Utiliza fetch API para enviar una solicitud POST al endpoint https://asesoriasnab.cl/send
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
  // Aquí se realiza la conexión al backend
  // URL del backend: usa /api/send en desarrollo y la URL completa en producción
  // En cPanel la App se expone por el dominio (proxy), por eso en producción no se debe incluir el puerto
  const baseUrl = import.meta.env.PROD ? 'https://asesoriasnab.cl' : '/api';
  const response = await fetch(`${baseUrl}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          tipoEmprendimiento: formData.tipoEmprendimiento,
          mensaje: formData.mensaje
        })
      });
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor.');
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/+56989164896?text=Hola,%20quiero%20hablar%20con%20un%20asesor%20sobre%20los%20servicios%20de%20NAB', '_blank');
  };

  const scrollToForm = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-4">
          {/* Botones de navegación */}
          <div className="flex justify-end gap-3 mb-4">
            <a
              href="https://asesoriasnab.cl/corporativa"
              target="_self"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              Ir a Corporativo
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-1">
            <div className="bg-white rounded-2xl shadow-lg flex items-center justify-center w-44 h-24 mb-0 p-1">
              <img src="/logo.png" alt="Asesorías NAB" className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center pb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              ¡Formaliza tu emprendimiento hoy con el{' '}
              <span className="text-yellow-300">Kit Emprendedor NAB!</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
              Desde la escritura y el inicio de actividades en el SII hasta emitir tu primera factura.{' '}
              <span className="font-semibold text-white block mt-2">Nosotros te guiamos paso a paso.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={scrollToForm}
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Quiero comenzar mi negocio <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={handleWhatsApp}
                className="border-2 border-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Habla con un asesor ahora
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Servicios */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todo lo que necesitas para formalizar y hacer crecer tu emprendimiento
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Kit Emprendedor */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-blue-600 hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Kit Emprendedor NAB</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Formaliza tu empresa con todo lo necesario: escritura, inicio de actividades en el SII, 
                verificación de giro y habilitación para emitir facturas. Si no tienes dirección comercial, 
                puedes usar la tuya o contratar una oficina virtual anual.
              </p>
              <button 
                onClick={scrollToForm}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Quiero formalizar mi empresa
              </button>
            </div>

            {/* Plan IVA Simplificado */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-green-600 hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Plan IVA Simplificado</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Contabilidad mensual para empresas ya constituidas: cálculo y declaración de IVA, 
                emisión de hasta 15 facturas mensuales, y reportes claros. Las boletas las emite el cliente.
              </p>
              <button 
                onClick={scrollToForm}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Necesito ayuda con mi IVA
              </button>
            </div>

            {/* Pack Gestión Laboral */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-t-4 border-purple-600 hover:-translate-y-2">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Pack Gestión Laboral Total</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ideal para microempresas con pocos trabajadores. Incluye contratos, liquidaciones de sueldo, 
                Previred, finiquitos y asesoría básica en RRHH.
              </p>
              <button 
                onClick={scrollToForm}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Quiero ordenar la parte laboral
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              ¿Por qué elegir Asesorías NAB?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 hover:bg-blue-50 rounded-xl transition-colors duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Acompañamiento personalizado</h3>
              <p className="text-gray-600">Te guiamos paso a paso en todo el proceso.</p>
            </div>

            <div className="text-center p-6 hover:bg-green-50 rounded-xl transition-colors duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Precios accesibles</h3>
              <p className="text-gray-600">Tarifas justas diseñadas para emprendedores.</p>
            </div>

            <div className="text-center p-6 hover:bg-purple-50 rounded-xl transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Todo en un solo lugar</h3>
              <p className="text-gray-600">Servicios integrales para todas tus necesidades.</p>
            </div>

            <div className="text-center p-6 hover:bg-yellow-50 rounded-xl transition-colors duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Atención directa por WhatsApp</h3>
              <p className="text-gray-600">Comunicación rápida y directa cuando lo necesites.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historias reales */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Historias reales de emprendedores
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Daniela */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300"> {/* expandir ventana al posicionar mouse */}
                "Tenía todo listo para vender mis productos naturales, pero no sabía cómo formalizar mi negocio. 
                Me hablaron de NAB y en menos de una semana ya tenía mi empresa registrada, con dirección tributaria 
                y lista para emitir facturas."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div>
                  <p className="font-bold text-gray-800">Daniela</p>
                  <p className="text-gray-600 text-sm">Emprendedora en San Bernardo</p>
                </div>
              </div>
            </div>

            {/* Marisol */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300"> {/* expandir ventana al posicionar mouse */}
                "Formar mi empresa era un paso importante y no sabía bien por dónde partir, hasta que conocí Asesorías NAB. 
                Una empresa confiable, rápida y muy cercana. Siempre atentos y disponibles cuando los he necesitado. 
                Su acompañamiento fue clave para dar este paso con tranquilidad.
                Gracias a ellos, hoy Alemaral Terapias es una empresa formalizada que camina con bases firmes.
                Los recomiendo con total confianza si estás buscando formalizar tu empresa o tu emprendimiento."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <p className="font-bold text-gray-800">Marisol Alcayaga</p>
                  <p className="text-gray-600 text-sm">Representante Legal Alemaral Terapias Spa</p>
                </div>
              </div>
            </div>
            {/* Luis */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300"> {/* expandir ventana al posicionar mouse */} 
                "Ya tenía mi empresa funcionando, pero cada mes era un caos con el IVA. Me contacté con NAB y ahora 
                ellos se encargan de todo. Me envían los reportes claros, me ayudan con las facturas, y yo puedo 
                enfocarme en atender a mis clientes."
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div>
                  <p className="font-bold text-gray-800">Luis</p>
                  <p className="text-gray-600 text-sm">Dueño de taller mecánico en Maipú</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Formulario de Contacto */}
      <section id="contacto" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                ¿Listo para dar el siguiente paso?
              </h2>
              <p className="text-xl text-gray-600">
                Cuéntanos sobre tu emprendimiento
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias!</h3>
                  <p className="text-gray-600">Te contactaremos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="Ingresa tu Nombre Completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="correo" className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        required
                        value={formData.correo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                        placeholder="tu.correo@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tipoEmprendimiento" className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de emprendimiento *
                    </label>
                    <select
                      id="tipoEmprendimiento"
                      name="tipoEmprendimiento"
                      required
                      value={formData.tipoEmprendimiento}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    >
                      <option value="">Selecciona tu tipo de emprendimiento</option>
                      <option value="estetica-belleza">Estética / Belleza</option>
                      <option value="venta-productos-internet">Venta de productos por internet</option>
                      <option value="restaurant-food-truck">Restaurant / Food Truck</option>
                      <option value="servicios-profesionales">Servicios profesionales</option>
                      <option value="educacion-cursos">Educación / Cursos</option>
                      <option value="produccion-artesanal">Producción artesanal</option>
                      <option value="servicios-tecnicos">Servicios técnicos</option>
                      <option value="transporte-delivery">Transporte / Delivery</option>
                      <option value="eventos-banqueteria">Eventos / Banquetería</option>
                      <option value="salud-bienestar">Salud / Bienestar</option>
                      <option value="construccion-comercio">Construcción / Comercio presencial</option>
                      <option value="otro">Otro (especificar en el mensaje)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensaje o consulta
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none"
                      placeholder="Cuéntanos más sobre tu emprendimiento y qué servicios necesitas..."
                    ></textarea>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                    >
                      <Mail className="w-5 h-5" />
                      Enviar mi consulta
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              ¿Listo para formalizar tu negocio y avanzar con confianza?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Completa el formulario o habla con un asesor por WhatsApp. ¡Estamos aquí para ayudarte!
            </p>
            <button 
              onClick={scrollToForm}
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              Quiero comenzar ahora <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-2xl shadow-lg flex items-center justify-center w-32 h-16 mb-4 p-1 mx-auto">
                <img src="/logo.png" alt="Asesorías NAB" className="h-full w-full object-contain" />
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Tu partner confiable para formalizar y hacer crecer tu emprendimiento en Chile.
              </p>
              <a
                href="https://asesoriasnab.cl/reportes/reporteandina.html"
                target="_self"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 border border-gray-600 hover:border-gray-400 px-3 py-1 rounded text-sm transition-colors duration-300"
              >
                Reportabilidad
              </a>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span className="text-gray-300">+56 9 89164896</span>
                    <span className="text-gray-300">+56 9 97165450</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 justify-center">
                  <Mail className="w-4 h-4 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-gray-300">nastorga@asesoriasnab.cl</span>
                    <span className="text-gray-300">vmacaya@asesoriasnab.cl</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <MapPin className="w-4 h-4" />
                  <span className="text-gray-300">Santiago, Chile</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4">Horarios</h4>
              <div className="text-gray-300 space-y-1">
                <p>Lunes a Viernes: 9:00 - 18:00</p>
                <p>Sábados: 9:00 - 13:00</p>
                <p>Domingos: Cerrado</p>
              </div>

              <h4 className="text-lg font-semibold mb-4 mt-8">Nuestras redes</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://www.instagram.com/asesorias_integrales_nab?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Síguenos en Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/asesorias-integrales-nab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Síguenos en LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>

                {/* Ejemplo oculto: botón para 'X' (antes Twitter).
                   Mantener con clase 'hidden' para referencia; quitar 'hidden' para mostrar.
                   Comentarios en cada bloque explican cada atributo y su uso. */}
                {/* URL de la red social: reemplazar por la URL final */}
                {/* href: "LINK_AQUI" */}
                {/* target: abrir en nueva pestaña */}
                {/* rel: seguridad: noopener y noreferrer */}
                {/* className: 'hidden' para mantener oculto; quitar para mostrar */}
                {/* aria-label: etiqueta accesible descriptiva */}
                <a
                  href="LINK_AQUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 hidden"
                  aria-label="Red social ejemplo: X"
                >
                  {/* Icono de ejemplo: usar <Twitter /> importado desde 'lucide-react' */}
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Asesorías NAB. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button - Botón flotante de contacto rápido */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5C] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Habla con un asesor por WhatsApp"
      >
        <div className="relative">
          <FaWhatsapp className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping" />
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full" />
        </div>
      </button>
    </div>
  );
}

export default App;