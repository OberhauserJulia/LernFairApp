# LernFairApp

## Inbetriebnahme

### Voraussetzungen

Stellen Sie sicher, dass die folgenden Tools installiert sind:
1. **Docker**: [Installationsanleitung](https://docs.docker.com/get-docker/)
2. **MongoDB**
3. **Node.js und npm**: [Download](https://nodejs.org/)
4. **Expo Go App**: Aus dem Google Play Store herunterladen
5. **Optional: Python**: Zum lokalen Starten des Backends

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
