
from flask import jsonify
from service.homerwork_service import safe_doc

def safe_homework(request) : 
     # Zugriff auf den JSON-Body der Anfrage
    if request.is_json:
        data = request.get_json()
        print(data)
        safe_doc(data)
    else:
        return jsonify({"error": "Request must be JSON"}), 400


    # Beispielhafte Verarbeitung der Daten
    response_data = {
        "message": "Hello from the controller!",
        "received_data": data
    }
    
    # Response zurückgeben
    return jsonify(response_data), 200
