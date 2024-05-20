import requests
import base64

# URL des Bildes, das heruntergeladen werden soll
image_url = "https://cdn.discordapp.com/attachments/1159897854312198166/1233036853108674631/0screenshot.png?ex=664c980e&is=664b468e&hm=97fcabc402639679be458b96ba8741b7967f73f8de7f74ec24f9c2c4ea48a3ad&" 

# Herunterladen des Bildes
response = requests.get(image_url)

# Überprüfen, ob das Herunterladen erfolgreich war
if response.status_code == 200:
    # Kodieren des heruntergeladenen Bildes in Base64
    image_base64 = base64.b64encode(response.content).decode('utf-8')

    # Ausgabe des Base64-kodierten Bildes
    print(image_base64)
else:
    print("Failed to download the image.")