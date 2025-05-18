# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io

# Install Docker Compose (versi terbaru)
sudo curl -L "https://github.com/docker/compose/releases/download/v2.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Tambahkan user ke group docker (untuk eksekusi tanpa sudo)
sudo usermod -aG docker $USER
newgrp docker  # atau logout/login

# Verifikasi instalasi
docker --version
docker-compose --version

#######
# Buka port di firewall AWS:
- Port 22 (SSH)
- Port 3000 (Aplikasi)
- Port 5432 (Opsional, hanya jika perlu akses eksternal ke DB)

# Di EC2 Security Group:
- Tambahkan inbound rules untuk port 3000 (HTTP) dan 5432 (jika perlu)

# Buat folder deployment
mkdir -p /app
chmod 755 /app

# Jika ingin menyimpan env vars permanen
echo 'export DB_NAME="your_db_name"' >> ~/.bashrc
echo 'export DB_USER="your_db_user"' >> ~/.bashrc
echo 'export DB_PASSWORD="your_db_password"' >> ~/.bashrc
source ~/.bashrc

# Hanya untuk instance dengan RAM < 2GB
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Cek Docker service
sudo systemctl status docker

# Cek koneksi ke Docker Hub
docker login -u <your-dockerhub-username>

# Test jalankan container sederhana
docker run hello-world

##
DOCKER_USERNAME    : Username Docker Hub
DOCKER_PASSWORD    : Password Docker Hub
EC2_SSH_KEY        : SSH private key untuk EC2
EC2_HOST           : IP Publik EC2
EC2_USER           : User EC2 (biasanya 'ubuntu')
DB_NAME            : Nama database
DB_USER            : User database
DB_PASSWORD        : Password database


####
# Cek container
docker ps

# Cek logs aplikasi
docker logs app

# Cek koneksi database
docker exec postgres psql -U your_user -d your_db -c "\dt"

# Test API
curl http://localhost:3000/api/v1/item






####
# Cek folder /app
ls -la /app

# Cek permission docker
docker ps

# Cek environment variables
cat /app/.env