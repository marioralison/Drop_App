# back/app.py
from flask import Flask, request, jsonify
import face_recognition
import numpy as np
import cv2
import base64

app = Flask(__name__)

images = [
    "../assets/images/face.jpg",
    "../assets/images/tsito.jpg",
    "../assets/images/iannis.jpg",
]

# Charger toutes les images de référence et extraire leurs encodages
known_encodings = []
for image_path in images:
    try:
        known_image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(known_image)
        if len(encodings) > 0 :
            known_encodings.append(encodings[0])
        else:
            print(f"Aucun visage trouvé dans {image_path}")
    except Exception as e:
        print(f"Erreur lors du chargement de {image_path}: {e}")

@app.route("/recognize", methods=["POST"])
def recognize():
    data = request.get_json()
    img_base64 = data["image"]

    # Décoder l'image base64
    img_bytes = base64.b64decode(img_base64.split(",")[1])
    np_arr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Extraire les encodages de visage
    encodings = face_recognition.face_encodings(img)
    if len(encodings) == 0:
        return jsonify({"recognized": False, "message": "Aucun visage trouvé"})

    # Comparer avec toutes les images connues
    for known_encoding in known_encodings:
        match = face_recognition.compare_faces([known_encoding], encodings[0])[0]
        if match:
            return jsonify({"recognized": True, "message": "Visage reconnu"})
    
    return jsonify({"recognized": False, "message": "Visage non reconnu"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)