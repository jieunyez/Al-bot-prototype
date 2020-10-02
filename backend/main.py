from flask import Flask, redirect, url_for, request, render_template
from transformers import AutoModelWithLMHead, AutoTokenizer
import json

app = Flask(__name__)

@app.route('/result/translation/', methods = ['POST', 'GET'])
def translators():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    lang = request_json.get('language')
    text = request_json.get('text')
    
    # Init model.
    model = AutoModelWithLMHead.from_pretrained("t5-base")
    tokenizer = AutoTokenizer.from_pretrained("t5-base")
    
    # Get translated result.
    inputs = tokenizer.encode(
        text.format(language = lang),
        return_tensors="pt")
    outputs = model.generate(inputs, max_length=40, num_beams=4, early_stopping=True)
    result = tokenizer.decode(outputs[0])
    response = {
            "success": True,
            "data": result
            }
    
    return json.dumps(response), 200


if __name__ == '__main__':
   app.run(debug = True)