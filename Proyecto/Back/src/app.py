import os
from flask import Flask, request, render_template

from models.rol import Rol
from models.usuario import Usuario
from models.medico import Medico
from models.pacienteafiliado import PacienteAfiliado
from models.solicitud import Solicitud
from models.pacientefamiliar import PacienteFamiliar
from models.peticion import Peticion
from models.historialmedico import Historialmedico
from models.documentoshistorial import DocumentosHistorial


from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './Archivos PDF'

CORS(app)



#Registro de Blueprint para utilizar aplicaciones fue de app
app.register_blueprint(Rol)
app.register_blueprint(Usuario)
app.register_blueprint(Medico)
app.register_blueprint(PacienteAfiliado)
app.register_blueprint(Solicitud)
app.register_blueprint(PacienteFamiliar)
app.register_blueprint(Peticion)
app.register_blueprint(Historialmedico)
app.register_blueprint(DocumentosHistorial)

@app.route('/subirarchivo', methods=['POST'])
def subirArchivo():
    f = request.files['archivo']
    filename = secure_filename(f.filename)
    f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return "se subio el archivo"

if __name__ == "__main__":
    app.run(debug = True)