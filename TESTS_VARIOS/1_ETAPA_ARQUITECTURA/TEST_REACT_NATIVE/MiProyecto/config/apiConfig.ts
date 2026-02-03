// Configuración del servidor FastAPI
// Puerto: 8000 (por defecto)

// Para Android emulador: usa http://10.0.2.2:8000
// Para dispositivo físico: usa tu IP local (ej: http://192.168.1.100:8000)
// Para iOS: localhost funciona

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  reportes: '/reportes',
};

// Función auxiliar para construir URLs
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
