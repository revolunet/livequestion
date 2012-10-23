# -*- encoding: UTF-8 -*-

import os
from bottle import route, run, static_file, redirect


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_DIR, 'statics')

@route('/')
def index():
    return static_file('index.html', root=STATIC_ROOT)

@route('/manage')
def manage():
    redirect("/#/manage")
    return static_file('index.html?manage', root=STATIC_ROOT)

@route('/statics/<filepath:path>')
def statics(filepath):
    return static_file(filepath, root=STATIC_ROOT)

@route('/questions.json', method="ANY")
def questions():
    return static_file('questions.json', root=BASE_DIR)


run(host='0.0.0.0', port=8080)
