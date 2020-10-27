from flask import Flask, redirect, url_for, request, render_template, jsonify
from transformers import AutoModelWithLMHead, AutoTokenizer
# from flask_pymongo import PyMongo
import json
import sys
from flask_cors import CORS

app = Flask(__name__)

# app.config['MONGO_DBNAME'] = 'usersLog'
# app.config['MONGO_URI'] = 'mongodb://todo:towait.com@localhost:27017/usersLog'

# mongo = PyMongo(app)

CORS(app)


@app.route('/test', methods = ['POST'])
def translators():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    model = request_json.get("model")
    if model == "Translation":
        lang = request_json.get("language")
        text = request_json.get("writing")
    
    
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
    else:
        article = request_json.get("writing")
    
        # Init model.
        model = AutoModelWithLMHead.from_pretrained("t5-base")
        tokenizer = AutoTokenizer.from_pretrained("t5-base")
        
        # Get summarization result.
        inputs = tokenizer.encode("summarize: " + article, return_tensors="pt", max_length=512)
        outputs = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
        
        response = {
                    "success": True,
                    "data": tokenizer.decode(outputs[0])
                }
        return jsonify(response)

@app.route('/summarization', methods = ['POST'])
def summarization():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    article = request_json.get("writing")
    
    # Init model.
    model = AutoModelWithLMHead.from_pretrained("t5-base")
    tokenizer = AutoTokenizer.from_pretrained("t5-base")
    
    # Get summarization result.
    inputs = tokenizer.encode("summarize: " + article, return_tensors="pt", max_length=512)
    outputs = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
    
    response = {
                "success": True,
                "data": tokenizer.decode(outputs[0])
            }
    return jsonify(response)


@app.route('/completion', methods=['POST'])
def completion():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    article = request_json.get("writing")

    # Init model.
    model = AutoModelWithLMHead.from_pretrained("t5-base")
    tokenizer = AutoTokenizer.from_pretrained("t5-base")

    # Get summarization result.
    inputs = tokenizer.encode("summarize: " + article, return_tensors="pt", max_length=512)
    outputs = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4,
                             early_stopping=True)

    response = {
        "success": True,
        "data": tokenizer.decode(outputs[0])
    }
    return jsonify(response)




if __name__ == '__main__':
   app.run(host="0.0.0.0", port = 5000, debug = True)