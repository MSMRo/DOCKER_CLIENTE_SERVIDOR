import streamlit as st
import requests
import uuid
from datetime import datetime

st.set_page_config(page_title="SIVAPRE - Cliente Test", layout="centered")
st.title("SIVAPRE – Reporte Ciudadano (Test Local)")

# =========================
# Evidencia (placeholder)
# =========================
st.subheader("Evidencia Fotográfica")

foto_file = st.file_uploader(
    "Selecciona una imagen del criadero",
    type=["jpg", "jpeg", "png"]
)

foto_url = None

if foto_file is not None:
    st.image(foto_file, caption="Vista previa", use_column_width=True)

    # ESTA ES LA ÚNICA INFORMACIÓN REAL DISPONIBLE
    foto_nombre = foto_file.name

    # Ruta lógica (no ruta del SO del usuario)
    foto_url = f"imagenes/{foto_nombre}"

    st.write("Referencia enviada a la API:")
    st.code(foto_url)

# =========================
# Ubicación
# =========================
st.subheader("Ubicación Exacta")
latitud = st.number_input("Latitud", format="%.6f")
longitud = st.number_input("Longitud", format="%.6f")

# =========================
# Detalles
# =========================
st.subheader("Detalles del criadero")

tipo_lugar_criadero = st.radio(
    "Tipo de lugar",
    ["Vivienda", "Vía Pública", "Terreno Abandonado"]
)

tipo_objeto_criadero = st.multiselect(
    "Objeto que contiene agua",
    ["Llantas", "Baldes", "Plantas", "Juguetes", "Techos", "Otro"]
)

observa_larvas = st.radio(
    "¿Observa larvas?",
    ["Sí, claramente", "No estoy seguro", "No"]
)

conocimiento_dengue_cercano = st.radio(
    "¿Casos de dengue cercanos?",
    ["Sí", "No lo sé", "No"]
)

comentarios_adicionales = st.text_area("Comentarios adicionales")

# =========================
# Envío
# =========================
if st.button("Enviar Reporte"):
    payload = {
        "id_reporte_app": str(uuid.uuid4()),
        "latitud": latitud,
        "longitud": longitud,
        "fecha_reporte": datetime.now().date().isoformat(),
        "hora_reporte": datetime.now().time().isoformat(timespec="seconds"),
        "foto_url": foto_url,
        "tipo_lugar_criadero": tipo_lugar_criadero,
        "tipo_objeto_criadero": tipo_objeto_criadero,
        "observa_larvas": observa_larvas,
        "conocimiento_dengue_cercano": conocimiento_dengue_cercano,
        "comentarios_adicionales": comentarios_adicionales,
        "estado_reporte": "Enviado"
    }

    st.write("Payload enviado:")
    st.json(payload)

    try:
        r = requests.post("http://127.0.0.1:8000/reportes", json=payload)
        st.success("Reporte enviado correctamente")
        st.json(r.json())
    except Exception as e:
        st.error(f"Error al conectar con la API: {e}")
