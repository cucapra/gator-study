from flask import Flask, request#, send_from_directory, render_template
#from flask import redirect, jsonify, url_for, make_response

#from flask_assets import Bundle, Environment

#from webassets import Bundle

import os
import json
import numpy
import re


app = Flask(__name__)
app.secret_key = 's3cr3t'
app.debug = False
app.threaded = False
app._static_folder = os.path.abspath("templates/static")



# js = Bundle('js/codemirror.js', 'js/main.js', 'js/start_page.js', 'js/survey.js', 'js/text_editor,js', 'js/tutorial.js', 'js/visualizer.js', output='gen/packed.js')
# assets = Environment(app)
# assets.register('js_all', js)

# env = Environment(app)
# env.config['sass_bin'] = '/usr/local/bin/sass'
# env.load_path = [os.path.join(os.path.dirname(__file__), 'sass')]
# js = Bundle('js/codemirror.js', 'js/main.js', 'js/start_page.js', 'js/survey.js', 'js/text_editor,js', 'js/tutorial.js', 'js/visualizer.js', output='gen/js_all.js')
# env.register('js_all', js)


# env['js_all'].urls()
# ('/media/gen/packed.js',)

#  myjs = Bundle('myjs/Interpolation.js', 'myjs/socketio.js' , filters='jsmin', output='myjs/all_min.js')
#  env.register('myjs_all', myjs)
#  css = Bundle('sass/base.sass', filters='sass', output='css/base.css')
#  env.register('css_all', css)


# set the project root directory as the static folder, you can set others.
# app = Flask(__name__, static_url_path='/templates/static')


@app.route('/', methods=['GET'])
def index():
	return render_template('layouts/index.html',
						   title="index")

@app.route('/gpt.html', methods=['GET'])
def gpt():
	return render_template('layouts/gpt.html',
						   title="gpt")

@app.route('/survey.html', methods=['GET'])
def survey():
	return render_template('layouts/survey.html',
						   title="survey")


if __name__ == "__main__":
	app.run(host='0.0.0.0', port=5000)