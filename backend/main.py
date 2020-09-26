from flask import Flask, redirect, url_for, request
from transformers import pipeline

app = Flask(__name__)

@app.route('/success/<name>')
def success(name):
   return 'welcome %s' % name

@app.route('/login',methods = ['POST', 'GET'])
def login():
   if request.method == 'POST':
      user = request.form['nm']
      return redirect(url_for('success',name = user))
   else:
      user = request.args.get('nm')
      return redirect(url_for('success',name = user))

@app.route('/result/translation/', methods = ['POST', 'GET'])
def translators():
    lang = request.form('language')
    language_map = {"Germen":"de", "French":"fr", 'Roman':'ro'}
    short_for_lang = langauge_map[lang]
    lang_parameter = 'translation_en_to_' + short_for_lang
    translation_result = pipeline(lang_parameter)

if __name__ == '__main__':
   app.run(debug = True)