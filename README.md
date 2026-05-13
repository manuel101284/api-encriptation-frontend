# 🎨 Frontend Encriptación

Aplicación Angular para gestión de usuarios con encriptación de datos sensibles.

## 🚀 Tecnologías

- **Angular 21**
- **TypeScript**
- **Bootstrap 5**
- **RxJS**

## ✨ Características

- ✅ Formulario de registro con validaciones
- ✅ Lista de usuarios con CRUD completo
- ✅ Modales para ver detalles y editar
- ✅ Validaciones en tiempo real:
  - Contraseña: 8-40 caracteres, letra, número, símbolo
  - Email formato válido
  - Teléfono: 7-15 dígitos
  - Edad: 18-120 años
- ✅ Consumo de API REST encriptada

## 🔧 Configuración

### Prerrequisitos

- Node.js 18+
- Angular CLI 21
- Backend corriendo en `http://localhost:8080`

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/manuel101284/front-encryption.git
   cd front-encryption
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar entorno**
  Editar src/environments/environment.ts

  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api'
  };
  ```

4. **Ejecutar la aplicación**
  
  ```bash
  ng serve --open
  ```

### 📁 Estrucutra del proyecto

src/app/
├── core/
│   ├── models/          # Interfaces TypeScript
│   └── services/        # Servicios HTTP
├── features/
│   ├── auth/register/   # Formulario de registro
│   └── users/user-list/ # Lista y gestión de usuarios
└── shared/              # Componentes reutilizables

### 🔗 API Backend
Este frontend consume la APR REST del backend - [api-encriptation-backend](https://github.com/manuel101284/api-encriptation-backend/tree/main)

### 📱 Vistas

    /register - Registro de nuevos usuarios

    /users - Lista de usuarios con opciones de edición y eliminación

### ✒️ Autor

Manuel Ricardo Castellanos - [Github](https://github.com/manuel101284)

