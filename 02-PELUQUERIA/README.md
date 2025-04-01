# Enunciado Peluquería App

## Descripción General
Aplicación web moderna para una empresa de peluquería que muestra servicios, productos y permite a los clientes registrarse y pedir citas online.

## Estructura del Frontend (React)
- **Landing Page (Ruta `/`)**
  - Información de la peluquería: nombre, ubicación y horarios.
  - Imagen destacada del local.
  - Botones para:
    - Ver servicios.
    - Ver productos.
    - Registrarse / Iniciar sesión.
    - Reservar una cita.

- **Servicios (Ruta `/servicios`)**
  - Lista de servicios ofrecidos (corte, peinado, barba, tinte, etc.).
  - Cada servicio muestra:
    - Nombre.
    - Precio.
    - Duración en minutos.
    - Categoría (hombre/mujer/unisex).
  - Opción para añadir servicios al "carrito de cita".

- **Productos (Ruta `/productos`)**
  - Lista de productos de peluquería (solo se muestran, no se compran online).
  - Información mostrada:
    - Nombre.
    - Marca.
    - Descripción.
    - Precio.

- **Registro e Inicio de Sesión (Rutas `/registro` y `/login`)**
  - Formulario de registro de cliente.
  - Formulario de login.
  - Al iniciar sesión, se guarda el JWT en el localStorage.

- **Reserva de Cita (Ruta `/reserva`)**
  - Selección de:
    - Servicios a realizar (lista con checkbox).
    - Fecha.
    - Hora.
  - Funcionalidades:
    - Cálculo de la duración total de la cita (suma de los tiempos de los servicios).
    - Verificación para evitar solapamiento de citas.
    - Restricción de horarios:  
      - Mañana: 9:30 - 14:30  
      - Tarde: 17:00 - 20:00
    - Guardado de la cita en el backend si es válida.

- **Perfil del Usuario (Ruta `/perfil`)**
  - Visualización de citas próximas y pasadas.
  - Posibilidad de cancelar una cita futura.

## Contextos a Crear
- **AuthContext**: Maneja el login, logout, usuario actual y token.
- **CitaContext**: Administra la selección de servicios para la cita.
- **HorarioContext (opcional)**: Controla la lógica de disponibilidad por horas.

## Tecnologías Utilizadas
- **Frontend:** React (Vite)