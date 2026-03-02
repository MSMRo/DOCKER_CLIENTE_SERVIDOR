from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Reporte, Usuario
from ..schemas import ReporteCreate, ReporteResponse, ReporteUpdateEstado
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import os
import shutil
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Token inválido")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    usuario = db.query(Usuario).filter(Usuario.username == username).first()
    if not usuario:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
    return usuario


@router.post("/upload-foto")
async def upload_foto(
    file: UploadFile = File(...), current_user: Usuario = Depends(get_current_user)
):
    extension = file.filename.split(".")[-1]
    filename = f"{current_user.id}_{os.urandom(8).hex()}.{extension}"
    filepath = f"uploads/{filename}"
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"foto_url": f"/uploads/{filename}"}


@router.post("/", response_model=ReporteResponse, status_code=201)
def crear_reporte(
    reporte: ReporteCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    nuevo_reporte = Reporte(
        usuario_id=current_user.id,
        latitud=reporte.latitud,
        longitud=reporte.longitud,
        foto_url=reporte.foto_url,
        tipo_lugar=reporte.tipo_lugar,
        tipo_objeto=reporte.tipo_objeto,
        observa_larvas=reporte.observa_larvas,
        conocimiento_dengue_cercano=reporte.conocimiento_dengue_cercano,
        comentarios=reporte.comentarios,
    )
    db.add(nuevo_reporte)
    db.commit()
    db.refresh(nuevo_reporte)
    return nuevo_reporte


@router.get("/mis-reportes", response_model=List[ReporteResponse])
def mis_reportes(
    db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)
):
    return db.query(Reporte).filter(Reporte.usuario_id == current_user.id).all()


@router.get("/{reporte_id}", response_model=ReporteResponse)
def obtener_reporte(
    reporte_id: str,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    reporte = (
        db.query(Reporte)
        .filter(Reporte.id == reporte_id, Reporte.usuario_id == current_user.id)
        .first()
    )
    if not reporte:
        raise HTTPException(status_code=404, detail="Reporte no encontrado")
    return reporte


@router.patch("/{reporte_id}/estado", response_model=ReporteResponse)
def actualizar_estado(
    reporte_id: str,
    estado_update: ReporteUpdateEstado,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    reporte = db.query(Reporte).filter(Reporte.id == reporte_id).first()
    if not reporte:
        raise HTTPException(status_code=404, detail="Reporte no encontrado")
    reporte.estado = estado_update.estado
    db.commit()
    db.refresh(reporte)
    return reporte


@router.delete("/{reporte_id}", status_code=204)
def eliminar_reporte(
    reporte_id: str,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user),
):
    reporte = (
        db.query(Reporte)
        .filter(Reporte.id == reporte_id, Reporte.usuario_id == current_user.id)
        .first()
    )
    if not reporte:
        raise HTTPException(status_code=404, detail="Reporte no encontrado")
    db.delete(reporte)
    db.commit()
