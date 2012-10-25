# -*- encoding: UTF-8 -*-

import os
import json
import random
import bottle
from bottle import route, run, static_file, redirect, request


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_DIR, 'statics')

QUESTIONS_FILE = 'questions.json'


def get_questions():
    try:
        questions = json.load(open(QUESTIONS_FILE, 'r'))
    except:
        questions = []
    return questions


def save_questions(questions):
    json.dump(questions, open(QUESTIONS_FILE, 'w'))


def add_question(text):
    q = get_questions()
    question = {
        'id': get_random_id(),
        'text': text
    }
    q.append(question)
    save_questions(q)
    return question


def get_random_id():
    return random.randint(100000, 99999999999)


# routes

# index
@route('/')
def index():
    return static_file('index.html', root=STATIC_ROOT)


## statics
@route('/manage')
def manage():
    return redirect("/#/manage")


@route('/thanks')
def thanks():
    return redirect("/#/thanks")


@route('/preview/<id:int>')
def preview(id):
    return redirect("/#/preview/%s" % id)


@route('/statics/<filepath:path>')
def statics(filepath):
    return static_file(filepath, root=STATIC_ROOT)


## questions

@route('/questions.json', method="ANY")
def questions():
    if request.method == 'POST':
        data = request.json
        return add_question(data.get('text', ''))
    return static_file('questions.json', root=BASE_DIR)


@route('/questions.json/<id:int>', method="ANY")
def questions2(id):
    questions = get_questions()
    res = None
    for idx, q in enumerate(questions):
        if q.get('id') == id:
            if request.method == 'DELETE':
                questions.pop(idx)
            elif request.method == 'GET':
                res = q
            elif request.method == 'POST':
                data = request.json
                q['text'] = data.get('text')
                res = q
    save_questions(questions)
            #print "REMOVE", id
        #data = request.json
        #add_question(data.get('text', ''))
    return res


bottle.debug(True)
run(host='0.0.0.0', port=8080)
