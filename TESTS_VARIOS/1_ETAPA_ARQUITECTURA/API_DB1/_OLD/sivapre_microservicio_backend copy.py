from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(
    title="SIVAPRE - Microservicio Reportes",
    version="0.1.0"
)

# =========================
# Modelo de datos
# =========================
class ReporteCiudadano(BaseModel):
    id_reporte_app: str
    latitud: float
    longitud: float
    fecha_reporte: str
    hora_reporte: str
    foto_url: str
    tipo_lugar_criadero: str
    tipo_objeto_criadero: List[str]
    observa_larvas: str
    conocimiento_dengue_cercano: str
    comentarios_adicionales: str
    estado_reporte: str

# =========================
# Endpoint
# =========================
@app.post("/reportes")
def recibir_reporte(reporte: ReporteCiudadano):
    print("\n=== NUEVO REPORTE CIUDADANO ===")
    for k, v in reporte.model_dump().items():
        print(f"{k}: {v}")
    print("================================\n")

    return {
        "status": "ok",
        "mensaje": "Reporte recibido",
        "id_reporte_app": reporte.id_reporte_app
    }
