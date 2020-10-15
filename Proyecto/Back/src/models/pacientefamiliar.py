from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request


from conexion import mongo

PacienteFamiliar = Blueprint('pacientefam', __name__)

@PacienteFamiliar.route('/pacientefam')
def obtenerPacienteFamiliar():
    pacienteafiliados = mongo.db.pacientefamiliar.find()
    respuesta = json_util.dumps(pacienteafiliados)
    
    return respuesta 

@PacienteFamiliar.route('/pacientefam/<id>', methods=['POST'])
def creaPacienteFamiliar(id):
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    titular = id    
            
    if cedula and nombre and apellido and titular:         
        mongo.db.pacientefamiliar.insert({        
            'cedula': cedula,
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono, 
            'direccion': direccion,
            'titular': titular        
        })
        
        return jsonify({'mensaje': 'Se agrego paciente afiliado'}) 

@PacienteFamiliar.route('/pacientefam/<id>')
def buscarPacienteFamiliar(id):
    pacienteafiliado = mongo.db.pacientefamiliar.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(pacienteafiliado)
    return respuesta

@PacienteFamiliar.route('/pacientefam/<id>', methods=['PUT'])

# Editar paciente familiar
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

# Eliminar paciente familiar
@PacienteFamiliar.route('/pacientefam/<id>', methods=['DELETE'])
def eliminarPacienteFamiliar(id):
    mongo.db.pacientefamiliar.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el paciente afiliado'}) 

# Obtener los pacientes de un titular
@PacienteFamiliar.route('/pacientefam/titular/<id>')
def obtenerPacientesFamiliareTitular(id):    
    pacientesfamiliares = mongo.db.pacientefamiliar.find({'titular': id})
    respuesta = json_util.dumps(pacientesfamiliares)
    return respuesta