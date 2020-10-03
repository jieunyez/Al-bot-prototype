from flask import Flask, redirect, url_for, request, render_template, jsonify
from transformers import AutoModelWithLMHead, AutoTokenizer
import json
import sys
app = Flask(__name__)

from flask_cors import CORS

CORS(app)


@app.route('/test', methods = ['POST'])
def translators():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    lang = request_json.get("language")
    text = request_json.get("writing")
    print(lang)
    print(text)

    # Init model.
    model = AutoModelWithLMHead.from_pretrained("t5-base")
    tokenizer = AutoTokenizer.from_pretrained("t5-base")
    
    # Get translated result.
    raw_text = "translate English to " + lang + ": " + text
    inputs = tokenizer.encode(
        raw_text.format(language = lang),
        return_tensors="pt")

    outputs = model.generate(inputs, max_length=40, num_beams=4, early_stopping=True)
    result = tokenizer.decode(outputs[0])

    response = {
            "success": True,
            "data": result
            }
    
    return jsonify(response)




if __name__ == '__main__':
   app.run(host="0.0.0.0", port = 5000, debug = True)