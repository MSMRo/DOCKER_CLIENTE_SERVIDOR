# SIVAPRE - App React Native

Aplicación móvil para reportes ciudadanos sobre criaderos de dengue, integrada con FastAPI.

## Instalación

### 1. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 2. Configurar la URL del servidor

Edita el archivo `config/apiConfig.ts` y reemplaza la URL:

```typescript
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://TU_IP:8000';
```

O usa variable de entorno:
```bash
export EXPO_PUBLIC_API_URL=http://192.168.1.100:8000
```

### 3. Ejecutar la app

```bash
npm start
# o
yarn start
```

Luego selecciona:
- `a` para Android
- `i` para iOS
- `w` para Web

## Características

✅ **Captura de GPS** - Ubicación exacta del criadero  
✅ **Foto con cámara o galería** - Evidencia visual  
✅ **Formulario completo** - Todos los datos requeridos  
✅ **Validaciones** - Campos obligatorios  
✅ **Envío HTTP** - POST a FastAPI  
✅ **Interfaz intuitiva** - Diseño responsivo  

## Datos capturados

- ID único del reporte (UUID)
- Coordenadas GPS (latitud, longitud)
- Fecha y hora
- Foto del criadero
- Tipo de lugar (vivienda, parcialarios, vía pública, terreno abandonado)
- Tipo de objeto con agua (llantas, plantas, tachos, otro)
- Observación de larvas (sí/no)
- Conocimiento de casos de dengue cercanos (sí/hace poco/no)
- Comentarios adicionales

## Estructura de archivos

```
MiProyecto/
├── app/
│   └── (tabs)/
│       └── index.tsx          # Formulario principal
├── config/
│   └── apiConfig.ts           # Configuración de servidor
├── hooks/
│   └── useGPS.ts              # Hook para ubicación GPS
├── services/
│   └── reporteService.ts      # Servicio HTTP para envío
├── package.json
└── tsconfig.json
```

## Endpoint FastAPI esperado

**POST** `/reportes`

**Payload:**
```json
{
  "id_reporte_app": "uuid-string",
  "latitud": 12.345678,
  "longitud": -76.987654,
  "fecha_reporte": "2024-01-13",
  "hora_reporte": "14:30:45",
  "foto_url": "file://path/or/http://url",
  "tipo_lugar_criadero": "vivienda",
  "tipo_objeto_criadero": ["llantas", "plantas"],
  "observa_larvas": "si",
  "conocimiento_dengue_cercano": "hace_poco",
  "comentarios_adicionales": "Zona muy cercana al río",
  "estado_reporte": "pendiente"
}
```

## Permisos requeridos

La app requiere los siguientes permisos en dispositivo:
- **Cámara** - Para capturar fotos
- **Galería** - Para seleccionar fotos
- **Ubicación** - Para obtener coordenadas GPS

Estos se solicitan automáticamente cuando el usuario intenta usar cada funcionalidad.

## Troubleshooting

### "Error de conexión al servidor"
- Verifica que la URL en `apiConfig.ts` sea correcta
- Comprueba que FastAPI está corriendo: `http://tu_ip:8000/docs`
- Si estás en Android emulador, usa `http://10.0.2.2:8000` en lugar de `localhost`

### "Permiso de ubicación denegado"
- Ve a Configuración > Aplicaciones > SIVAPRE > Permisos > Ubicación
- Selecciona "Permitir siempre"

### "Error al seleccionar foto"
- Verifica que la app tenga permiso para acceder a cámara y galería
- En algunos dispositivos necesitas reiniciar la app

## Próximos pasos

- Subir fotos a servidor (actualmente usa URI local)
- Validación de datos más rigurosa
- Indicador de progreso de envío
- Historial de reportes enviados
- Mapas para visualizar reportes
