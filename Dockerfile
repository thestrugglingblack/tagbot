FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

ENV PYTHONUNBUFFERED=1

RUN mkdir -p /app/logs && \
    useradd -m botuser && \
    chown -R botuser:botuser /app

USER botuser

CMD ["python", "run.py"]