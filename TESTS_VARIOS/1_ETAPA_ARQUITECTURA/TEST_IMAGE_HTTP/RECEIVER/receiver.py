from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os

app = FastAPI()

# Ruta para guardar las imágenes recibidas
UPLOAD_FOLDER = ""
#os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Ruta completa donde se guardará la imagen
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        
        # Guardar la imagen en el servidor
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return JSONResponse(content={"message": "Imagen recibida exitosamente", "filename": file.filename})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)