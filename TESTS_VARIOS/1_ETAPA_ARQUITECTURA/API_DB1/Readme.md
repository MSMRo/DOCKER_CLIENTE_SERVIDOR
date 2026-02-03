Se requiere tener:

- Dockers
- PGADMIN
- python

Instalar librerias de python

$ pip install fastapi uvicorn sqlalchemy psycopg2-binary

Activar el backend del micro servicio sivapre

$ uvicorn sivapre_microservicio_backend:app --reload   # no poner el .py, sale error

Activar la app hecha en streamlit

$ streamlit run sivapre_client_streamlit.py
