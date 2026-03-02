import { useState } from 'react';
import { crearReporte, getMisReportes, getReporteById } from '../services/api';

export function useReportes() {
    const [loading, setLoading] = useState(false);
    const [reportes, setReportes] = useState([]);

    const enviarReporte = async (datos: {
        latitud: number;
        longitud: number;
        foto_url?: string;
        tipo_lugar: string;
        tipo_objeto: string;
        observa_larvas: string;
        conocimiento_dengue_cercano: string;
        comentarios?: string;
    }) => {
        setLoading(true);
        try {
            await crearReporte(datos);
        } catch (error) {
            throw new Error('No se pudo enviar el reporte.');
        } finally {
            setLoading(false);
        }
    };

    const cargarMisReportes = async () => {
        setLoading(true);
        try {
            const data = await getMisReportes();
            setReportes(data);
        } catch (error) {
            throw new Error('Error al cargar los reportes.');
        } finally {
            setLoading(false);
        }
    };

    const cargarReporteById = async (id: string) => {
        setLoading(true);
        try {
            return await getReporteById(id);
        } catch (error) {
            throw new Error('Error al cargar el reporte.');
        } finally {
            setLoading(false);
        }
    };

    return { enviarReporte, cargarMisReportes, cargarReporteById, loading, reportes };
}