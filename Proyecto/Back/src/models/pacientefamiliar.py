from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request
import json

from conexion import mongo

PacienteFamiliar = Blueprint('pacientefam', __name__)

#Ruta y Metodo para obtener los pacientes familiares (en general)
@PacienteFamiliar.route('/pacientefam')
def obtenerPacienteFamiliar():
    pacienteafiliados = mongo.db.pacientefamiliar.find()
    respuesta = json_util.dumps(pacienteafiliados)

    return respuesta

#Ruta y Metodo para obtener los pacientes familiares (en general)
@PacienteFamiliar.route('/pacientefam/<id>', methods=['POST'])
def crearPacienteFamiliar(id):

    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    titular = id    
    
    #Se convierte la consulta en un json
    resultado = json.dumps(mongo.db.pacienteafiliado.find_one({'_id': ObjectId(id)}, {'_id': 0}))
    
    #Se obtiene una cadena json
    jsonencode = json.loads(resultado)
    
    #Se extrae el dato del campo medico dentro del paciente para 
    #asignarle un valor al medico de los pacientes familiares
    medico = jsonencode['medico']


    if cedula and nombre and apellido and titular:
        mongo.db.pacientefamiliar.insert({
            'cedula': cedula,
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono,
            'direccion': direccion,
            'titular': titular,
            'medico': medico
        })

        return jsonify({'mensaje': 'Se agrego paciente afiliado'})


#Ruta y Metodo para buscar un paciente familiar
@PacienteFamiliar.route('/pacientefam/<id>')
def buscarPacienteFamiliar(id):
    pacienteafiliado = mongo.db.pacientefamiliar.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(pacienteafiliado)
    return respuesta


#Ruta y Metodo para editar paciente familiar
@PacienteFamiliar.route('/pacientefam/<id>', methods=['PUT'])
def editarPacienteFamiliar(id):
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']


    if nombre and apellido and telefono:
        mongo.db.pacientefamiliar.update_one({'_id': ObjectId(id)}, {'$set': {
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono,
            'direccion': direccion
        }})

        respuesta = jsonify({'mensaje': 'se edito el paciente afiliado'})
        return respuesta

#Ruta y Metodo para eliminar paciente familiar
@PacienteFamiliar.route('/pacientefam/<id>', methods=['DELETE'])
def eliminarPacienteFamiliar(id):
    mongo.db.pacientefamiliar.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el paciente afiliado'})

##Ruta y Metodo para obtener los pacientes de un titular
@PacienteFamiliar.route('/pacientefam/titular/<id>')
def obtenerPacientesFamiliareTitular(id):
    pacientesfamiliares = mongo.db.pacientefamiliar.find({'titular': id})
    respuesta = json_util.dumps(pacientesfamiliares)
    return respuesta