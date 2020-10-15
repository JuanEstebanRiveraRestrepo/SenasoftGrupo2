from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request


from conexion import mongo

Medico = Blueprint('medico', __name__)

@Medico.route('/medico')
def obtenerMedicos():
    medicos = mongo.db.medico.find()
    respuesta = json_util.dumps(medicos)
    
    return respuesta 

@Medico.route('/medico', methods=['POST'])
def creaMedico():
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    cargo = request.json['cargo']
    especialidad = request.json['especialidad']
        
    if cedula and nombre and cargo and telefono:         
        mongo.db.medico.insert({        
            'cedula': cedula,
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono, 
            'direccion': direccion,
            'cargo': cargo,
            'especialidad': especialidad
            
        })
        
        return jsonify({'mensaje': 'Se agrego medico'}) 

@Medico.route('/medico/<id>')
def buscarMedico(id):
    medico = mongo.db.medico.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(medico)
    return respuesta
    
@Medico.route('/medico/buscar/<nombre>')
def buscarMedicoPorNombre(nombre):
    medico = mongo.db.medico.find_one({'nombre': nombre}, {'nombre': 1} )
    respuesta = json_util.dumps(medico)
    return respuesta
        
    
@Medico.route('/medico/<id>', methods=['PUT'])
def editarMedico(id):
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    cargo = request.json['cargo']
    especialidad = request.json['especialidad']
    
    
    if cedula and nombre and cargo and telefono:
        mongo.db.medico.update_one({'_id': ObjectId(id)}, {'$set': {            
            'cedula': cedula,
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono, 
            'direccion': direccion,
            'cargo': cargo,
            'especialidad': especialidad        
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el medico'}) 
        return respuesta   

@Medico.route('/medico/<id>', methods=['DELETE'])
def eliminarMedico(id):
    mongo.db.medico.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el medico'}) 