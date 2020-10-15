from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request
import json

from conexion import mongo

Solicitud = Blueprint('solicitud', __name__)

@Solicitud.route('/solicitud')
def obtenerSolicitudes():
    solicitudes = mongo.db.solicitud.find()
    respuesta = json_util.dumps(solicitudes)
    
    return respuesta 

@Solicitud.route('/solicitud/<id>', methods=['POST'])
def crearSolicitud(id):     
    paciente = id
    
    resultado = json.dumps(mongo.db.pacienteafiliado.find_one({'_id': ObjectId(id)}, {'medico': 1, '_id': 0}))
    pacienteencode = json.loads(resultado)        
    medicoAnterior = pacienteencode['medico']
    medicoCambio = request.json['medicoCambio']
    motivo = request.json['motivo']
    
            
    if paciente and medicoCambio and motivo:         
        mongo.db.solicitud.insert({  
                                   
            'paciente': id,
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
    medicoCambio = request.json['medicoCambio']
    motivo = request.json['motivo']
    
    
    if medicoCambio and motivo:
        mongo.db.solicitud.update_one({'_id': ObjectId(id)}, {'$set': {                                    
            'medicoCambio': medicoCambio,
            'motivo': motivo                    
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el medico'}) 
        return respuesta   

@Solicitud.route('/solicitud/<id>', methods=['DELETE'])
def eliminarSolicitud(id):
    mongo.db.solicitud.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el medico'}) 