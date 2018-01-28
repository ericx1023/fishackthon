import os   
from flask import Flask, request, redirect, url_for, render_template, flash, session, jsonify
from werkzeug.utils import secure_filename

# Gives user's home directory
userhome = os.path.expanduser('~')          
username = os.path.split(userhome)[-1]

UPLOAD_FOLDER = '/Users/' + username + '/code/fishackthon/web/backend/upload'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = "super secret key"

@app.route("/")
def index():
    return render_template('index.html')

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return jsonify(
                    filename=filename
                )


@app.route('/recognition', methods=['GET'])
def recognition():
    filename = request.args.get('name', '')
    return 'ok: ' + filename