# schemas.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

# ─── Usuario ───────────────────────────────────────


class UsuarioCreate(BaseModel):
    nombre_completo: str
    dni: str
    telefono: Optional[str] = None
    municipio: Optional[str] = None
    username: str
    password: str


class UsuarioResponse(BaseModel):
    id: UUID
    nombre_completo: str
    dni: str
    telefono: Optional[str]
    municipio: Optional[str]
    username: str
    fecha_registro: datetime
    activo: bool

    class Config:
        from_attributes = True


# ─── Auth ──────────────────────────────────────────


class LoginRequest(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


# ─── Reporte ───────────────────────────────────────


class ReporteCreate(BaseModel):
    latitud: float
    longitud: float
    foto_url: Optional[str] = None
    tipo_lugar: str
    tipo_objeto: str
    observa_larvas: str
    conocimiento_dengue_cercano: str
    comentarios: Optional[str] = None


class ReporteResponse(BaseModel):
    id: UUID
    usuario_id: UUID
    latitud: float
    longitud: float
    foto_url: Optional[str]
    tipo_lugar: str
    tipo_objeto: str
    observa_larvas: str
    conocimiento_dengue_cercano: str
    comentarios: Optional[str]
    estado: str
    fecha_reporte: datetime

    class Config:
        from_attributes = True


class ReporteUpdateEstado(BaseModel):
    estado: str
