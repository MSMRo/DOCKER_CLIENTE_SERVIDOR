# models.py

from sqlalchemy import Column, String, Float, DateTime, Boolean, Text, Enum
from sqlalchemy.types import Uuid
from sqlalchemy.sql import func
from app.database import Base
import uuid
import enum


class EstadoReporte(str, enum.Enum):
    enviado = "Enviado"
    en_revision = "En Revisión"
    verificado = "Verificado"
    resuelto = "Resuelto"


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    nombre_completo = Column(String(100), nullable=False)
    dni = Column(String(8), unique=True, nullable=False)
    telefono = Column(String(15), nullable=True)
    municipio = Column(String(100), nullable=True)
    username = Column(String(50), unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    fecha_registro = Column(DateTime(timezone=True), server_default=func.now())
    activo = Column(Boolean, default=True)


class Reporte(Base):
    __tablename__ = "reportes"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    usuario_id = Column(String, nullable=False)
    latitud = Column(Float, nullable=False)
    longitud = Column(Float, nullable=False)
    foto_url = Column(String, nullable=True)
    tipo_lugar = Column(String(50), nullable=False)
    tipo_objeto = Column(String(50), nullable=False)
    observa_larvas = Column(String(30), nullable=False)
    conocimiento_dengue_cercano = Column(String(20), nullable=False)
    comentarios = Column(Text, nullable=True)
    estado = Column(Enum(EstadoReporte), default=EstadoReporte.enviado)
    fecha_reporte = Column(DateTime(timezone=True), server_default=func.now())
