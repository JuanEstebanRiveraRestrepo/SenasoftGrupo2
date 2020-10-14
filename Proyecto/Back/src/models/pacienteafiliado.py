from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request


from conexion import mongo

PacienteAfiliado = Blueprint('pacienteaf', __name__)

@PacienteAfiliado.route('/pacienteaf')
def obtenerMedicos():
    pacienteafiliados = mongo.db.pacienteafiliado.find()
    respuesta = json_util.dumps(pacienteafiliados)
    
    return respuesta 

@PacienteAfiliado.route('/pacienteaf', methods=['POST'])
def creaMedicos():
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    medico = request.json['medico']
    
        
    if cedula and nombre and apellido and telefono:         
        mongo.db.pacienteafiliado.insert({        
            'cedula': cedula,
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono, 
            'direccion': direccion,
            'medico': medico
            
        })
        
        return jsonify({'mensaje': 'Se agrego paciente afiliado'}) 

@PacienteAfiliado.route('/pacienteaf/<id>')
def buscarUsuario(id):
    pacienteafiliado = mongo.db.pacienteafiliado.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(pacienteafiliado)
    return respuesta
    
@PacienteAfiliado.route('/pacienteaf/<id>', methods=['PUT'])
def editarUsuario(id):
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    medico = request.json['medico']
    
    
    if cedula and nombre and apellido and telefono:
        mongo.db.pacienteafiliado.update_one({'_id': ObjectId(id)}, {'$set': {            
            'cedula': cedula,
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono, 
            'direccion': direccion,
            'medico': medico       
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el paciente afiliado'}) 
        return respuesta   

@PacienteAfiliado.route('/pacienteaf/<id>', methods=['DELETE'])
def eliminarUsuario(id):
    mongo.db.pacienteafiliado.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el paciente afiliado'}) 