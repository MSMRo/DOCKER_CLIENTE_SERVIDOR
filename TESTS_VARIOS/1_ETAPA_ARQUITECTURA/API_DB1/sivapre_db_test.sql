CREATE TABLE reportes_ciudadanos (
    id SERIAL PRIMARY KEY,

    id_reporte_app UUID NOT NULL UNIQUE,

    latitud DOUBLE PRECISION NOT NULL,
    longitud DOUBLE PRECISION NOT NULL,

    fecha_reporte DATE NOT NULL,
    hora_reporte TIME NOT NULL,

    foto_url TEXT NOT NULL,

    tipo_lugar_criadero VARCHAR(50) NOT NULL,
    tipo_objeto_criadero TEXT[] NOT NULL,

    observa_larvas VARCHAR(50) NOT NULL,
    conocimiento_dengue_cercano VARCHAR(50) NOT NULL,

    comentarios_adicionales TEXT NOT NULL,
    estado_reporte VARCHAR(30) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
