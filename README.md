# LernFairApp

## Inbetriebnahme

### Voraussetzungen

Stellen Sie sicher, dass die folgenden Tools installiert sind:
1. **Docker**
2. **MongoDB**
3. **Node.js und npm**
4. **Expo Go App**
5. **Optional: Python**

### Anleitung

1. **Repository klonen**
    ```bash
    git clone https://github.com/OberhauserJulia/LernFairApp.git
    cd LernFairApp
    ```

2. **Backend mit Docker starten**
    ```bash
    cd Backend
    docker-compose up -d
    ```

3. **Frontend vorbereiten**
    ```bash
    cd ../Frontend
    npm install
    ```

4. **Umgebungsvariable setzen**
    ```bash
    IP_ADDRESS="http://<Ihre-IP-Adresse>:8000"
    ```

5. **Expo App starten**
    ```bash
    npx expo start
    ```
    Scannen Sie den QR-Code im Terminal mit der Expo Go App.

### Hinweise

- Bei Problemen mit Docker, stellen Sie sicher, dass der Docker-Daemon läuft und ausreichende Berechtigungen vorhanden sind.
- Optional: Backend lokal mit Python starten
    ```bash
    python Backend/main.py
    ```
