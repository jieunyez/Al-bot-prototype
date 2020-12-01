from flask import Flask, redirect, url_for, request, render_template, jsonify
from transformers import AutoModelWithLMHead, AutoTokenizer
from flask_pymongo import PyMongo
import json
import sys
from flask_cors import CORS

app = Flask(__name__)

app.config.update(
    MONGO_URI='mongodb://localhost:27017/flask',
    MONGO_USERNAME='wxc',
    MONGO_PASSWORD='111111'
)

mongo = PyMongo(app)

CORS(app)


@app.route('/test', methods = ['POST'])
def translators():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    model = request_json.get("model")
    if model == "Translation":
        userid = request_json.get("ID")
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
        
        # MongoDB
        user = {'id':userid, 'model':'translation', 'input':text, 'output':result}
        mongo.db.users.insert_one(user)
    
        response = {
                "success": True,
                "data": result
                }
        
        return jsonify(response)
    elif model == "Summarization":
        article = request_json.get("writing")
    
        # Init model.
        model = AutoModelWithLMHead.from_pretrained("t5-base")
        tokenizer = AutoTokenizer.from_pretrained("t5-base")
        
        # Get summarization result.
        inputs = tokenizer.encode("summarize: " + article, return_tensors="pt", max_length=512)
        outputs = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
        
        # MongoDB
        user = {'id':userid, 'model':'summarization', 'input':article, 'output':tokenizer.decode(outputs[0])}
        mongo.db.users.insert_one(user)
        
        response = {
                    "success": True,
                    "data": tokenizer.decode(outputs[0])
                }
        return jsonify(response)
    else:
        # Get the parameters and raw texts from the frontend side(JSON format).
        article = request_json.get("writing")
        prompt = "Here are eight companies pivoting"
        
        # Preprocess input
        # In the future we can add a parameter to control how many sentences we
        # want to put in the model.
        text_list = article.split('.')
        new_article = '.'.join(text_list[-5:])
    
        # Init model.
        model = AutoModelWithLMHead.from_pretrained("xlnet-base-cased", return_dict=True)
        tokenizer = AutoTokenizer.from_pretrained("xlnet-base-cased")
    
        inputs = tokenizer.encode(new_article + prompt, add_special_tokens=False, return_tensors="pt")
        prompt_length = len(tokenizer.decode(inputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True))
        outputs = model.generate(inputs, max_length=250, do_sample=True, top_p=0.95, top_k=60)
        generated = prompt + tokenizer.decode(outputs[0])[prompt_length:]
        
        # MongoDB
        user = {'id':userid, 'model':'completion', 'input':article, 'output':generated}
        mongo.db.users.insert_one(user)
    
        response = {
            "success": True,
            "data": generated
        }
        return jsonify(response)

@app.route('/summarization', methods = ['POST'])
def summarization():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    userid = request_json.get("ID")
    article = request_json.get("writing")
    
    # Init model.
    model = AutoModelWithLMHead.from_pretrained("t5-base")
    tokenizer = AutoTokenizer.from_pretrained("t5-base")
    
    # Get summarization result.
    inputs = tokenizer.encode("summarize: " + article, return_tensors="pt", max_length=512)
    outputs = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
    
    # MongoDB
    user = {'id':userid, 'model':'summarization', 'input':article, 'output':tokenizer.decode(outputs[0])}
    mongo.db.users.insert_one(user)
    
    response = {
                "success": True,
                "data": tokenizer.decode(outputs[0])
            }
    return jsonify(response)


@app.route('/completion', methods=['POST'])
def completion():
    # Get the parameters and raw texts from the frontend side(JSON format).
    request_json = request.get_json()
    userid = request_json.get("ID")
    article = request_json.get("writing")
    prompt = "Here are eight companies pivoting"
    
    # Preprocess input
    # In the future we can add a parameter to control how many sentences we
    # want to put in the model.
    text_list = article.split('.')
    new_article = '.'.join(text_list[-5:])

    # Init model.
    model = AutoModelWithLMHead.from_pretrained("xlnet-base-cased", return_dict=True)
    tokenizer = AutoTokenizer.from_pretrained("xlnet-base-cased")

    inputs = tokenizer.encode(new_article + prompt, add_special_tokens=False, return_tensors="pt")
    prompt_length = len(tokenizer.decode(inputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True))
    outputs = model.generate(inputs, max_length=250, do_sample=True, top_p=0.95, top_k=60)
    generated = prompt + tokenizer.decode(outputs[0])[prompt_length:]
    
    # MongoDB
    user = {'id':userid, 'model':'completion', 'input':article, 'output':generated}
    mongo.db.users.insert_one(user)

    response = {
        "success": True,
        "data": generated
    }
    return jsonify(response)




if __name__ == '__main__':
   app.run(host="0.0.0.0", port = 5000, debug = True)