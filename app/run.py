# -*- encoding: UTF-8 -*-

import os
import shutil
import json
import bottle
from bottle import route, run, static_file, redirect, request
import sqlite3

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(BASE_DIR, 'statics')

SAMPLE_DB = 'sample.sqlite'
QUESTIONS_DB = 'questions.sqlite'


def db_dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0].lower()] = row[idx]
    return d


def db_get_cursor():
    in_db = os.path.join(BASE_DIR, QUESTIONS_DB)
    if not os.path.isfile(in_db):
        shutil.copyfile(os.path.join(BASE_DIR, SAMPLE_DB), in_db)
    conn = sqlite3.connect(in_db)
    conn.row_factory = db_dict_factory
    conn.isolation_level = None
    c = conn.cursor()
    return c


def db_exec(sql, sqlargs=None):
    c = db_get_cursor()
    if sqlargs:
        c.execute(sql, sqlargs)
    else:
        c.execute(sql)
    return c


def get_questions():
    questions = db_exec('SELECT * FROM questions')
    return questions.fetchall()


def get_question(id):
    questions = db_exec('SELECT * FROM questions WHERE ID=?', (id, ))
    return questions.fetchone()


def add_question(text="test", theme='question'):
    c = db_exec("INSERT INTO questions (text, theme) VALUES(?, ?)", (text, theme))
    return get_question(c.lastrowid)


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
        return json.dumps(add_question(data.get('text', ''), data.get('theme', '')))
    return json.dumps(get_questions())


@route('/questions.json/<id:int>', method="ANY")
def questions2(id):
    res = None
    if request.method == 'DELETE':
        # delete a questions
        db_exec("DELETE FROM QUESTIONS WHERE ID=?", (id, ))
    elif request.method == 'GET':
        # get single question
        res = get_question(id)
    elif request.method == 'POST':
        # update a question
        data = request.json
        db_exec("UPDATE questions SET text=?, done=? WHERE ID=?", (data.get('text'), data.get('done'), id))
        res = get_question(id)
    return json.dumps(res)


bottle.debug(True)
run(server='paste', host='0.0.0.0', port=8080)
