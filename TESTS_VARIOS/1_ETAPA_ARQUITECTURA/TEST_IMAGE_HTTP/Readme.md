# Proyecto de Envío y Recepción de Imágenes con FastAPI

Este proyecto permite enviar y recibir imágenes utilizando FastAPI. Está dividido en dos carpetas principales:

- **RECEIVER/**: Contiene el servidor receptor que utiliza FastAPI para recibir y guardar imágenes.
- **SENDER/**: Contiene un notebook que envía imágenes al servidor receptor.

## Configuración del Entorno Virtual

1. Crea un entorno virtual:

   ```bash
   python3 -m venv venv
   ```
2. Activa el entorno virtual:

   - En Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - En Windows:
     ```bash
     .\venv\Scripts\activate
     ```
3. Instala las librerías necesarias:

   ```bash
   pip install fastapi uvicorn requests ipywidgets 
   pip install python-multipart
   ```

## Contenido de las Carpetas

### RECEIVER/

- **receiver.py**: Archivo principal que contiene el servidor FastAPI. Este servidor escucha solicitudes POST para recibir imágenes y guardarlas en la carpeta `uploaded_images`.

### SENDER/

- **sender_img.ipynb**: Notebook que envía imágenes al servidor receptor utilizando la librería `requests`.

## Uso del Proyecto

### Iniciar el Servidor Receptor

1. Navega a la carpeta `RECEIVER`:

   ```bash
   cd RECEIVER
   ```
2. Inicia el servidor:

   ```bash
   uvicorn receiver:app --reload
   ```
3. Si necesitas usar otro puerto, por ejemplo el puerto `8080`, inicia el servidor con:

   ```bash
   uvicorn receiver:app --reload --port 7000
   ```

### Enviar una Imagen desde el Notebook

1. Abre el archivo `sender_img.ipynb` en un entorno compatible con Jupyter.
2. Modifica la variable `image_path` para que apunte a la ruta de la imagen que deseas enviar.
3. Ejecuta las celdas del notebook para enviar la imagen al servidor.

## Librerías Usadas

- **FastAPI**: Framework para construir APIs rápidas y eficientes.
- **Uvicorn**: Servidor ASGI para ejecutar aplicaciones FastAPI.
- **Requests**: Librería para realizar solicitudes HTTP desde Python.

## Notas Adicionales

- Asegúrate de que el servidor receptor esté corriendo antes de enviar imágenes desde el notebook.
- Las imágenes recibidas se guardarán en la carpeta `uploaded_images` dentro de `RECEIVER`.
- Si el puerto `8000` está ocupado, puedes cambiarlo utilizando el parámetro `--port` al iniciar el servidor.
