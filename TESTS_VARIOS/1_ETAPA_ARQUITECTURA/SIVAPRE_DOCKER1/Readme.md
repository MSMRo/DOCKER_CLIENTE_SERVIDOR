# SIVAPRE – Microservicio de Reportes (FastAPI + PostgreSQL + Streamlit)

Este repositorio contiene un **entorno completo y funcional** para el componente de reportes ciudadanos de  **SIVAPRE** , implementado siguiendo una arquitectura  **local → Docker → (futuro Kubernetes)** .

El sistema está compuesto por **tres contenedores** desacoplados:

* 🟦  **FastAPI** : microservicio backend que recibe reportes y los guarda en PostgreSQL
* 🟩  **Streamlit** : cliente de prueba (frontend liviano) para enviar reportes
* 🐘  **PostgreSQL** : base de datos relacional con persistencia

---

## 1. Arquitectura general

```text
[ Streamlit ]  -->  HTTP POST  -->  [ FastAPI ]  -->  SQL  -->  [ PostgreSQL ]
   (8501)                         (8000)                     (5432)
```

* Streamlit **solo envía datos** (no guarda nada)
* FastAPI **valida y persiste** los datos
* PostgreSQL **almacena los reportes** de forma persistente

---

## 2. Estructura del proyecto

```text
sivapre/
│
├── backend/
│   ├── sivapre_microservicio_backend.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── sivapre_app_streamlit.py
│   ├── requirements.txt
│   └── Dockerfile
│
└── docker-compose.yml
```

---

## 3. Servicios y puertos

| Servicio   | Puerto | Acceso                                                |
| ---------- | ------ | ----------------------------------------------------- |
| Streamlit  | 8501   | [http://localhost:8501](http://localhost:8501/)          |
| FastAPI    | 8000   | [http://localhost:8000/docs](http://localhost:8000/docs) |
| PostgreSQL | 5432   | localhost:5432 (pgAdmin / psql)                       |

---

## 4. Cómo levantar TODO el sistema

### Requisitos previos

* Docker
* Docker Compose

### Paso único

Desde la carpeta raíz del proyecto (`sivapre/`):

```bash
docker compose up --build
```

> ⚠️  **Importante** : no es necesario ejecutar `uvicorn` ni `streamlit` manualmente.
> Docker lo hace automáticamente dentro de cada contenedor.

---

## 5. Qué levanta Docker internamente

### PostgreSQL

* Imagen oficial: `postgres:15`
* Base de datos creada automáticamente: `sivapre_db`
* Usuario: `postgres`
* Password: `postgres`
* Persistencia: volumen Docker (`postgres_data`)

### FastAPI (backend)

* Se ejecuta con:

```bash
uvicorn sivapre_microservicio_backend:app --host 0.0.0.0 --port 8000
```

* Conecta a PostgreSQL usando:

```text
postgresql+psycopg2://postgres:postgres@db:5432/sivapre_db
```

> ⚠️ Dentro de Docker  **NO se usa `localhost`** , se usa el nombre del servicio (`db`).

### Streamlit (frontend)

* Se ejecuta con:

```bash
streamlit run sivapre_app_streamlit.py
```

* Envía datos al backend usando:

```text
http://backend:8000/reportes
```

---

## 6. Cómo acceder a cada componente

### Streamlit

Abrir en el navegador:

```text
http://localhost:8501
```

Desde aquí:

* Se llena el formulario
* Se selecciona una imagen (solo como referencia)
* Se envía el reporte

---

### FastAPI

Documentación interactiva (Swagger):

```text
http://localhost:8000/docs
```

Aquí puedes:

* Ver el endpoint `POST /reportes`
* Probar envíos manuales

---

### PostgreSQL

#### Opción A: pgAdmin (recomendado)

Conexión:

| Campo         | Valor      |
| ------------- | ---------- |
| Host          | localhost  |
| Puerto        | 5432       |
| Usuario       | postgres   |
| Password      | postgres   |
| Base de datos | sivapre_db |

Consulta de prueba:

```sql
SELECT * FROM reportes_ciudadanos ORDER BY id DESC;
```

#### Opción B: terminal Docker

```bash
docker exec -it sivapre_postgres psql -U postgres -d sivapre_db
```

---

## 7. Modelo de datos (resumen)

La tabla principal es:

```text
reportes_ciudadanos
```

Campos:

* id (PK)
* id_reporte_app (UUID)
* latitud, longitud
* fecha_reporte, hora_reporte
* foto_url (referencia lógica)
* tipo_lugar_criadero
* tipo_objeto_criadero (array)
* observa_larvas
* conocimiento_dengue_cercano
* comentarios_adicionales
* estado_reporte
* created_at

---

## 8. Flujo completo de datos

1. Usuario llena formulario en Streamlit
2. Streamlit construye un JSON
3. Streamlit envía `POST /reportes`
4. FastAPI valida con Pydantic
5. FastAPI guarda en PostgreSQL
6. PostgreSQL persiste el registro

---

## 9. Comandos útiles

### Ver contenedores activos

```bash
docker ps
```

### Ver logs

```bash
docker logs sivapre_backend
docker logs sivapre_streamlit
docker logs sivapre_postgres
```

### Detener todo

```bash
docker compose down
```

---

## 10. Buenas prácticas aplicadas

* Arquitectura desacoplada
* Persistencia real
* Variables de entorno
* Servicios independientes
* Listo para Docker
* Listo para Kubernetes

---

## 11. Próximos pasos sugeridos

* Volúmenes para imágenes
* Endpoints GET (listar / filtrar reportes)
* Validaciones avanzadas (ENUM, rangos)
* Alembic (migraciones)
* Kubernetes (Deployment + Service + PVC)

---

✅ Este proyecto ya representa un  **microservicio real** , no un ejemplo académico.


1️⃣ ¿La base de datos se elimina cuando paro Docker?
🔴 Depende de cómo esté configurado PostgreSQL en Docker

Hay dos escenarios:

❌ Escenario A: SIN volumen (no persistente)

Si tu servicio PostgreSQL en docker-compose.yml NO usa volúmenes, por ejemplo:

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: sivapre_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres


👉 Resultado:

Al hacer docker compose down

SE BORRA TODO

base de datos

tablas

datos

📌 Esto es típico en pruebas rápidas, no recomendado para proyectos reales.

✅ Escenario B: CON volumen (persistente) ✔️ (lo correcto)

Si tienes algo como esto:

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: sivapre_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

docker compose up --build


👉 Resultado:

- docker compose stop → ❌ no se borra nada
- docker compose down → ❌ no se borra nada
- docker compose down -v → ⚠️ sí se borra

📌 Este es el modo profesional y correcto.

2️⃣ ¿Dónde se guarda físicamente la base de datos?
🔹 Si usas volumen de Docker

Docker guarda los datos en una ruta interna del sistema:

En Windows (Docker Desktop):

Dentro de la VM de Docker (no directamente visible)

En Linux:

/var/lib/docker/volumes/postgres_data/_data


📌 No necesitas acceder manualmente a esa ruta.
Todo se gestiona vía:

- PostgreSQL
- pgAdmin
-  docker exec

3️⃣ ¿Es posible exportar la base de datos? ✅ SÍ (y es obligatorio saber hacerlo)

Tienes 3 métodos profesionales.

🥇 Método 1 — Exportar con pg_dump (RECOMENDADO)
📤 Exportar toda la base de datos
$ docker exec sivapre_postgres \
pg_dump -U postgres sivapre_db > sivapre_backup.sql


✔️ Te genera un archivo:

sivapre_backup.sql

📥 Restaurar la base de datos
$ docker exec -i sivapre_postgres \
psql -U postgres sivapre_db < sivapre_backup.sql


📌 Este método es estándar en la industria.

🥈 Método 2 — Exportar desde pgAdmin (visual)

En pgAdmin:

Click derecho en sivapre_db
 → Backup…


Selecciona:

Format: Custom o Plain

Incluye datos + esquema

✔️ Ideal si no quieres usar terminal.

🥉 Método 3 — Exportar solo una tabla
$ docker exec sivapre_postgres \
pg_dump -U postgres -t reportes_ciudadanos sivapre_db > reportes.sql
