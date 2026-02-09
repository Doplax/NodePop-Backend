# Seed - Inicialización de Base de Datos

Este directorio contiene los scripts y datos necesarios para inicializar la base de datos de NodePop.

## 📁 Estructura

```
seed/
├── init-db.ts              # Script principal de inicialización
├── seed-products.ts        # Script legacy (solo productos)
└── data/
    ├── users.data.ts       # Datos de usuarios iniciales
    └── products.data.ts    # Datos de productos iniciales
```

## 🚀 Uso

### Inicializar la base de datos completa

Este comando **sobrescribe completamente** la base de datos con datos iniciales:

```bash
npm run init-db
```

o alternativamente:

```bash
npm run seed
```

### ¿Qué hace el script?

1. **Limpia** todos los datos existentes (usuarios y productos)
2. **Crea** los usuarios con contraseñas hasheadas
3. **Crea** los productos de prueba
4. **Muestra** un resumen de los datos creados

## 👥 Usuarios por defecto

El script crea los siguientes usuarios:

| Email | Password | Rol |
|-------|----------|-----|
| admin@example.com | 1234 | Admin |
| user@example.com | 1234 | Usuario |
| john.doe@example.com | password123 | Usuario |
| maria.garcia@example.com | securePass456 | Usuario |
| test.user@example.com | test1234 | Usuario |

## 📦 Productos por defecto

Se crean 5 productos de ejemplo con diferentes categorías y precios.

## ✏️ Personalización

### Agregar usuarios

Edita `data/users.data.ts` y agrega nuevos usuarios al array:

```typescript
{
  email: "nuevo@example.com",
  password: "password", // Sin hashear - el script lo hasheará automáticamente
}
```

### Agregar productos

Edita `data/products.data.ts` y agrega nuevos productos al array:

```typescript
{
  name: "Nuevo Producto",
  price: 299,
  isForSale: true,
  photo: {
    data: null,
    contentType: "image/jpeg",
  },
  tags: ["Electronics"],
}
```

## ⚠️ Importante

- Este script **sobrescribe** todos los datos existentes
- Las contraseñas se hashean automáticamente con bcrypt
- Asegúrate de que MongoDB esté corriendo antes de ejecutar el script
- El script lee las variables de entorno del archivo `.env`

## 🔧 Requisitos

- MongoDB corriendo (local o Docker)
- Variables de entorno configuradas en `.env`
- Dependencias instaladas (`npm install`)
