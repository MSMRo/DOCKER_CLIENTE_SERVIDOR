import { getApiUrl, API_ENDPOINTS } from '@/config/apiConfig';

export interface ReporteCiudadano {
  id_reporte_app: string; // UUID
  latitud: number;
  longitud: number;
  fecha_reporte: string; // YYYY-MM-DD
  hora_reporte: string; // HH:mm:ss
  foto_url: string;
  tipo_lugar_criadero: string;
  tipo_objeto_criadero: string[];
  observa_larvas: string;
  conocimiento_dengue_cercano: string;
  comentarios_adicionales: string;
  estado_reporte: string;
}

export interface ApiResponse {
  status: string;
  id_db: number;
  id_reporte_app: string;
}

// Función para enviar reporte al servidor
export const enviarReporte = async (reporte: ReporteCiudadano): Promise<ApiResponse> => {
  try {
    const url = getApiUrl(API_ENDPOINTS.reportes);
    
    console.log('Enviando reporte a:', url);
    console.log('Datos:', JSON.stringify(reporte, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reporte),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const data: ApiResponse = await response.json();
    console.log('Respuesta del servidor:', data);
    
    return data;
  } catch (error) {
    console.error('Error al enviar reporte:', error);
    throw error;
  }
};
