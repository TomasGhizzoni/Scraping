from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json
import os

app = Flask(__name__)
CORS(app)

# data.json existe
def ensure_data_file():
    if not os.path.exists("data.json"):
        with open("data.json", "w", encoding="utf-8") as file:
            json.dump([], file)

@app.route('/scrape', methods=['POST'])
def scrape():
    try:
        data = request.get_json()
        url = data.get("url")
        
        if not url:
            return jsonify({"error": "URL no proporcionada"}), 400

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Lanzará una excepción para códigos de estado no exitosos

        soup = BeautifulSoup(response.text, "html.parser")
        articles = soup.find_all("h2")
        extracted_data = []

        for article in articles:
            title = article.get_text(strip=True)
            link = article.find("a")
            url_to_save = link["href"] if link and link.has_attr("href") else url
            
            # check url
            if url_to_save.startswith("/"):
                url_to_save = f"{'/'.join(url.split('/')[:3])}{url_to_save}"
            
            extracted_data.append({
                "title": title,
                "url": url_to_save
            })

        # Salva i dati in un file JSON
        ensure_data_file()
        with open("data.json", "w", encoding="utf-8") as file:
            json.dump(extracted_data, file, indent=4, ensure_ascii=False)

        return jsonify(extracted_data)

    except requests.RequestException as e:
        return jsonify({"errore": f"Errore di red: {str(e)}"}), 503
    except Exception as e:
        return jsonify({"errore": f"Errore inaspettato: {str(e)}"}), 500

@app.route('/export/json', methods=['GET'])
def export_json():
    try:
        ensure_data_file()
        with open("data.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            return jsonify(data), 200
    except Exception as e:
        return jsonify({"errore": f"Errore di esportazione: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    ensure_data_file()
    app.run(host='0.0.0.0', port=5000, debug=True)