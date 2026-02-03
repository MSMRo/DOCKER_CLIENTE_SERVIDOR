import streamlit as st
import requests
import uuid
from datetime import datetime

st.set_page_config(
    page_title="SIVAPRE - Cliente de Prueba",
    layout="centered"
)

st.title("SIVAPRE – Reporte Ciudadano (Docker Test)")

# =====================================================
# FOTO (REFERENCIA LÓGICA)
# =====================================================
st.subheader("Evidencia Fotográfica")

foto_file = st.file_uploader(
    "Selecciona una imagen",
    type=["jpg", "jpeg", "png"]
)

foto_url = "sin_imagen"

if foto_file is not None:
    st.image(foto_file, caption="Vista previa", use_column_width=True)
    foto_url = f"imagenes/{foto_file.name}"
    st.code(foto_url)

# =====================================================
# UBICACIÓN
# =====================================================
st.subheader("Ubicación")
latitud = st.number_input("Latitud", format="%.6f")
longitud = st.number_input("Longitud", format="%.6f")

# =====================================================
# DETALLES
# =====================================================
st.subheader("Detalles del criadero")

tipo_lugar_criadero = st.radio(
    "Tipo de lugar",
    ["Vivienda", "Vía Pública", "Terreno Abandonado"]
)

tipo_objeto_criadero = st.multiselect(
    "Objeto con agua",
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

# =====================================================
# ENVÍO
# =====================================================
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
        # NOMBRE DEL SERVICIO BACKEND EN DOCKER
        r = requests.post("http://backend:8000/reportes", json=payload)
        st.success("Reporte enviado correctamente")
        st.json(r.json())
    except Exception as e:
        st.error(f"Error al conectar con el backend: {e}")
