from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from datetime import date, time
from uuid import UUID
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import (
    create_engine, Column, Integer, Float, Date, Time,
    Text, String, DateTime
)
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import ARRAY, UUID as PG_UUID

# =====================================================
# CONFIGURACIÓN DE LA BASE DE DATOS
# =====================================================
#DATABASE_URL = "postgresql+psycopg2://postgres:TU_PASSWORD@localhost:5432/sivapre_db"
DATABASE_URL = "postgresql+psycopg2://postgres:valkiria@localhost:5432/sivapre_test"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# =====================================================
# MODELO SQLALCHEMY (TABLA)
# =====================================================
class ReporteCiudadanoDB(Base):
    __tablename__ = "reportes_ciudadanos"

    id = Column(Integer, primary_key=True, index=True)

    id_reporte_app = Column(PG_UUID(as_uuid=True), unique=True, nullable=False)

    latitud = Column(Float, nullable=False)
    longitud = Column(Float, nullable=False)

    fecha_reporte = Column(Date, nullable=False)
    hora_reporte = Column(Time, nullable=False)

    foto_url = Column(Text, nullable=False)

    tipo_lugar_criadero = Column(String(50), nullable=False)
    tipo_objeto_criadero = Column(ARRAY(Text), nullable=False)

    observa_larvas = Column(String(50), nullable=False)
    conocimiento_dengue_cercano = Column(String(50), nullable=False)

    comentarios_adicionales = Column(Text, nullable=False)
    estado_reporte = Column(String(30), nullable=False)

    created_at = Column(DateTime, server_default=func.now())

# =====================================================
# MODELO PYDANTIC (REQUEST)
# =====================================================
class ReporteCiudadano(BaseModel):
    id_reporte_app: UUID
    latitud: float
    longitud: float
    fecha_reporte: date
    hora_reporte: time
    foto_url: str
    tipo_lugar_criadero: str
    tipo_objeto_criadero: List[str]
    observa_larvas: str
    conocimiento_dengue_cercano: str
    comentarios_adicionales: str
    estado_reporte: str

# =====================================================
# APLICACIÓN FASTAPI
# =====================================================
app = FastAPI(
    title="SIVAPRE - Microservicio de Reportes",
    version="1.0.0"
)

# =====================================================
# CONFIGURAR CORS
# =====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las origins (para desarrollo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================================
# ENDPOINT PARA GUARDAR REPORTE
# =====================================================
@app.post("/reportes")
def recibir_reporte(reporte: ReporteCiudadano):
    db = SessionLocal()

    try:
        nuevo_reporte = ReporteCiudadanoDB(
            id_reporte_app=reporte.id_reporte_app,
            latitud=reporte.latitud,
            longitud=reporte.longitud,
            fecha_reporte=reporte.fecha_reporte,
            hora_reporte=reporte.hora_reporte,
            foto_url=reporte.foto_url,
            tipo_lugar_criadero=reporte.tipo_lugar_criadero,
            tipo_objeto_criadero=reporte.tipo_objeto_criadero,
            observa_larvas=reporte.observa_larvas,
            conocimiento_dengue_cercano=reporte.conocimiento_dengue_cercano,
            comentarios_adicionales=reporte.comentarios_adicionales,
            estado_reporte=reporte.estado_reporte
        )

        db.add(nuevo_reporte)
        db.commit()
        db.refresh(nuevo_reporte)

        print("\n===== REPORTE GUARDADO EN POSTGRES =====")
        print(f"ID BD: {nuevo_reporte.id}")
        print(f"ID APP: {nuevo_reporte.id_reporte_app}")
        print(f"Latitud: {nuevo_reporte.latitud}")
        print(f"Longitud: {nuevo_reporte.longitud}")
        print(f"Fecha: {nuevo_reporte.fecha_reporte}")
        print(f"Hora: {nuevo_reporte.hora_reporte}")
        print(f"Foto URL: {nuevo_reporte.foto_url}")
        print(f"Objetos: {nuevo_reporte.tipo_objeto_criadero}")
        print("=======================================\n")

        return {
            "status": "ok",
            "mensaje": "Reporte guardado correctamente",
            "id_db": nuevo_reporte.id,
            "id_reporte_app": str(nuevo_reporte.id_reporte_app)
        }

    finally:
        db.close()
