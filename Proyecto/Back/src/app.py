from flask import Flask

from models.rol import Rol
from models.usuario import Usuario
from models.medico import Medico
from models.pacienteafiliado import PacienteAfiliado
from models.solicitud import Solicitud
from models.pacientefamiliar import PacienteFamiliar


app = Flask(__name__)

app.register_blueprint(Rol)
app.register_blueprint(Usuario)
app.register_blueprint(Medico)
app.register_blueprint(PacienteAfiliado)
app.register_blueprint(Solicitud)
app.register_blueprint(PacienteFamiliar)


if __name__ == "__main__":
    app.run(debug = True)