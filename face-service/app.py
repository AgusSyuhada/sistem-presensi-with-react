from flask import Flask, request, jsonify
import face_recognition
import cv2
import numpy as np
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import tempfile


app = Flask(__name__)


DB_CONFIG = {
    "host": os.environ.get("DB_HOST"),
    "database": os.environ.get("DB_DATABASE"), # BARU
    "user": os.environ.get("DB_USER"),     # BARU
    "password": os.environ.get("DB_PASSWORD"), # BARU
    "port": int(os.environ.get("DB_PORT")),
}


def get_db():
    return psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)


def detect_face_robust(image_path):
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Gambar tidak bisa dibaca")

    h, w = image.shape[:2]
    print(f"[DEBUG] Input: {w}x{h}")

    small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
    rgb_small = cv2.cvtColor(small_image, cv2.COLOR_BGR2RGB)

    face_locations = face_recognition.face_locations(
        rgb_small, number_of_times_to_upsample=0, model="cnn"
    )

    if len(face_locations) == 0:
        raise ValueError("Tidak ada wajah terdeteksi")

    if len(face_locations) > 1:
        raise ValueError("Lebih dari satu wajah")

    top, right, bottom, left = face_locations[0]
    top *= 4
    right *= 4
    bottom *= 4
    left *= 4

    h, w = image.shape[:2]
    top, bottom = max(0, top), min(h, bottom)
    left, right = max(0, left), min(w, right)

    return (top, right, bottom, left), image


@app.route("/register", methods=["POST"])
def register():
    if "file" not in request.files:
        return jsonify({"error": "No file"}), 400

    file = request.files["file"]
    id_tendik = request.form.get("id_tendik")
    if not id_tendik:
        return jsonify({"error": "id_tendik required"}), 400

    fd, temp_path = tempfile.mkstemp(prefix="reg_", suffix=".jpg")
    os.close(fd)  # Tutup file descriptor agar .save() bisa menulis
    file.save(temp_path)
    # --------------------------

    try:
        (top, right, bottom, left), full_image = detect_face_robust(temp_path)

        face_image = full_image[top:bottom, left:right]
        rgb_face = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)

        encoding = face_recognition.face_encodings(rgb_face)
        if len(encoding) == 0:
            raise ValueError("Gagal encode wajah")
        encoding = encoding[0]

        encoding_list = encoding.tolist()
        encoding_vector = "[" + ",".join(map(str, encoding_list)) + "]"

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """
            UPDATE Tenaga_Kependidikan 
            SET data_wajah = %s, embedding_vector = %s::vector(128)
            WHERE id_tendik = %s
            """,
            (encoding_list, encoding_vector, id_tendik),
        )
        affected = cur.rowcount
        conn.commit()
        cur.close()
        conn.close()

        if affected == 0:
            return jsonify({"error": "User tidak ditemukan"}), 404

        return jsonify(
            {
                "message": "Wajah berhasil diregistrasi",
                "id_tendik": id_tendik,
                "face_size": f"{right-left}x{bottom-top}",
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # --- PERBAIKAN ROBUSTNESS ---
        # Selalu hapus file sementara, bahkan jika ada error.
        if os.path.exists(temp_path):
            os.remove(temp_path)
        # ----------------------------


@app.route("/verify", methods=["POST"])
def verify():
    if "file" not in request.files:
        return jsonify({"error": "No file"}), 400

    file = request.files["file"]

    # --- PERBAIKAN KEAMANAN ---
    # Gunakan tempfile di SINI JUGA.
    fd, temp_path = tempfile.mkstemp(prefix="verify_", suffix=".jpg")
    os.close(fd)
    file.save(temp_path)
    # --------------------------

    try:
        (top, right, bottom, left), full_image = detect_face_robust(temp_path)

        face_image = full_image[top:bottom, left:right]
        rgb_face = cv2.cvtColor(face_image, cv2.COLOR_BGR2RGB)

        new_encoding = face_recognition.face_encodings(rgb_face)
        if len(new_encoding) == 0:
            raise ValueError("Gagal encode wajah")
        new_encoding = new_encoding[0]
        new_encoding_str = "[" + ",".join(map(str, new_encoding.tolist())) + "]"

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            """
            SELECT id_tendik, nama,
                   1 - (embedding_vector <=> %s::vector) AS similarity
            FROM Tenaga_Kependidikan
            WHERE embedding_vector IS NOT NULL
            ORDER BY embedding_vector <=> %s::vector
            LIMIT 1
            """,
            (new_encoding_str, new_encoding_str),
        )
        row = cur.fetchone()
        conn.close()

        if row and row["similarity"] > 0.8:
            return jsonify(
                {
                    "verified": True,
                    "id_tendik": row["id_tendik"],
                    "nama": row["nama"],
                    "confidence": round(row["similarity"], 4),
                }
            )

        return jsonify({"verified": False, "message": "Wajah tidak dikenali"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # --- PERBAIKAN ROBUSTNESS ---
        # Selalu hapus file sementara
        if os.path.exists(temp_path):
            os.remove(temp_path)
        # ----------------------------


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
