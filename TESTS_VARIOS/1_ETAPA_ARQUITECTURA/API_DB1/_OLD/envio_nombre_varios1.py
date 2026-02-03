from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

# GET
#curl "http://127.0.0.1:8000/get-ejemplo?nombre=Moises&edad=34"

@app.get("/")
def root():
    return {"mensaje": "Hola mundo desde FastAPI"}

#http://127.0.0.1:8000/saludo/Moises
@app.get("/saludo/{nombre}")
def saludar(nombre: str):
    return {"saludo": f"Hola {nombre}"}

@app.get("/despedida/{nombre}")
def despedir(nombre: str):
    return {"despedida": f"Adiós {nombre}"}

# http://127.0.0.1:8000/perfil?nombre=Moises&edad=34
@app.get("/perfil")
def perfil(nombre: str, edad: int):
    return {
        "nombre": nombre,
        "edad": edad
    }

# POST
"""
 curl -X POST "http://127.0.0.1:8000/usuarios" \
     -H "Content-Type: application/json" \
     -d '{"nombre": "Moises", "edad": 34}'
CMD:

curl -X POST http://127.0.0.1:8000/usuarios ^
     -H "Content-Type: application/json" ^
     -d "{\"nombre\": \"Moises\", \"edad\": 34}"

"""
class Usuario(BaseModel):
    nombre: str
    edad: int


@app.post("/usuarios")
def crear_usuario(usuario: Usuario):
    return {
        "mensaje": "Usuario creado",
        "usuario": usuario
    }



# PUT
# @app.put("/usuarios/{usuario_id}")
# def actualizar_usuario(usuario_id: int, usuario: Usuario):
#     return {
#         "mensaje": "Usuario actualizado",
#         "usuario_id": usuario_id,
#         "usuario": usuario
#     }