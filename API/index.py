from flask import Flask, request, jsonify
from flask_cors import CORS
import replicate
import os
from dotenv import load_dotenv

load_dotenv()

REPLICATE_API_TOKEN = os.getenv('VITE_APP_REPLICATE_API_TOKEN')
VITE_APP_REPLICATE_API_SECRET = os.getenv('VITE_APP_REPLICATE_API_SECRET')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

# Set your Replicate API key
replicate_client = replicate.Client(api_token=REPLICATE_API_TOKEN)

@app.route('/generate-sticker', methods=['POST'])
def generate_sticker():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        output = replicate_client.run(
            f"fofr/sticker-maker:{VITE_APP_REPLICATE_API_SECRET}",
            input={
                "steps": 17,
                "width": 1152,
                "height": 1152,
                "prompt": prompt,
                "output_format": "webp",
                "output_quality": 100,
                "negative_prompt": "",
                "number_of_images": 1
            }
        )
        return jsonify({'output': output})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
