FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY sivapre_app_streamlit.py .

EXPOSE 8501

CMD ["streamlit", "run", "sivapre_app_streamlit.py", "--server.port=8501", "--server.address=0.0.0.0"]
