from flask import Flask, request, jsonify
import replicate

app = Flask(__name__)

# Set your Replicate API key
REPLICATE_API_TOKEN = import.meta.env.VUE_APP_REPLICATE_API_TOKEN 
replicate_client = replicate.Client(api_token=REPLICATE_API_TOKEN)

@app.route('/generate-sticker', methods=['POST'])
def generate_sticker():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    try:
        output = replicate_client.run(
            `fofr/sticker-maker:import.meta.env.VUE_APP_REPLICATE_API_SECRET`,
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
