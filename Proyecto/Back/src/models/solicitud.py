from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request


from conexion import mongo



Solicitud = Blueprint('solicitud', __name__)

@Solicitud.route('/solicitud')
def obtenerSolicitudes():
    solicitudes = mongo.db.solicitud.find()
    respuesta = json_util.dumps(solicitudes)
    
    return respuesta 

@Solicitud.route('/solicitud', methods=['POST'])
def crearSolicitud():
    paciente = request.json['paciente']
    medicoAnterior = request.json['medicoAnterior']
    medicoCambio = request.json['medicoCambio']
    motivo = request.json['motivo']
    
            
    if paciente and medicoAnterior and medicoCambio and motivo:         
        mongo.db.solicitud.insert({        
            'paciente': paciente,
            'medicoAnterior': medicoAnterior,
            'medicoCambio': medicoCambio,
            'motivo': motivo                         
        })   
                                             
    return jsonify({'mensaje': 'Se agrego la solicitud'}) 
    

@Solicitud.route('/solicitud/<id>')
def buscarSolicitud(id):
    medico = mongo.db.solicitud.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(medico)
    return respuesta
    
@Solicitud.route('/solicitud/<id>', methods=['PUT'])
def editarSolicitud(id):
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    cargo = request.json['cargo']
    especialidad = request.json['especialidad']
    
    
    if cedula and nombre and cargo and telefono:
        mongo.db.solicitud.update_one({'_id': ObjectId(id)}, {'$set': {            
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

@Solicitud.route('/solicitud/<id>', methods=['DELETE'])
def eliminarSolicitud(id):
    mongo.db.solicitud.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el medico'}) 