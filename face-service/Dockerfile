FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3-pip \
        python3 \
        python3-dev \
        build-essential \
        cmake \
        libopenblas-dev \
        liblapack-dev \
        libx11-dev \
        libgtk-3-dev \
        libglib2.0-0 \
        libsm6 \
        libxext6 \
        libxrender-dev \
        libgomp1 \
        ffmpeg \
        libsm6 \
        libxext6 && \
    rm -rf /var/lib/apt/lists/*

RUN ln -s /usr/bin/python3 /usr/bin/python

WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]