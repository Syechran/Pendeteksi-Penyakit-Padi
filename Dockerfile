# ==========================================
# STAGE 1: Build React Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Setup Python & FastAPI
# ==========================================
FROM python:3.9-slim

# Set Hugging Face environment variables
ENV USER=user
ENV UID=1000
ENV HOME=/home/$USER
ENV PATH=$HOME/.local/bin:$PATH

# Install system dependencies required by OpenCV (used by Ultralytics YOLO)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Create user for Hugging Face Spaces security
RUN useradd -m -u $UID $USER
USER $USER
WORKDIR $HOME/app

# Copy requirements and install
COPY --chown=$USER:$USER requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY --chown=$USER:$USER backend ./backend

# Copy the built React app from Stage 1 into the "dist" folder
COPY --chown=$USER:$USER --from=frontend-builder /app/dist ./dist

# Expose Hugging Face default port
EXPOSE 7860

# Run Uvicorn pointing to main.py inside backend/ directory
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
