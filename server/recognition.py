# back/app.py
from flask import Flask, request, jsonify
import face_recognition
import numpy as np
import cv2
import base64

app = Flask(__name__)

# Charger l'image de référence d'une personne connue
known_image = face_recognition.load_image_file("../assets/images/face.jpg")
known_encoding = face_recognition.face_encodings(known_image)[0]

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

    # Comparer avec l'image connue
    match = face_recognition.compare_faces([known_encoding], encodings[0])[0]
    return jsonify({"recognized": bool(match)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
