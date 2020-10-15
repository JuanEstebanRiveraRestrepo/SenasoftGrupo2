from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request
import json

from conexion import mongo

Peticion = Blueprint('peticion', __name__)

@Peticion.route('/solicitud')
def obtenerPeticion():
    peticiones = mongo.db.peticion.find()
    respuesta = json_util.dumps(peticiones)
    
    return respuesta 

@Peticion.route('/solicitud/<id>', methods=['POST'])
def crearPeticion(id):     
    paciente = id
    
    resultado = json.dumps(mongo.db.peticion.find_one({'_id': ObjectId(id)}, {'medico': 1, '_id': 0}))
    pacienteencode = json.loads(resultado)        
    medicoAnterior = pacienteencode['medico']
    medicoCambio = request.json['medicoCambio']
    motivo = request.json['motivo']
    
            
    if paciente and medicoCambio and motivo:         
        mongo.db.peticion.insert({  
                                   
            'paciente': id,
            'medicoAnterior': medicoAnterior,
            'medicoCambio': medicoCambio,
            'motivo': motivo                         
        })   
                                             
    return jsonify({'mensaje': 'Se agrego la solicitud'}) 
    

@Peticion.route('/solicitud/<id>')
def buscarSolicitud(id):
    medico = mongo.db.peticion.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(medico)
    return respuesta
    
@Peticion.route('/solicitud/<id>', methods=['PUT'])
def editarSolicitud(id):            
    medicoCambio = request.json['medicoCambio']
    motivo = request.json['motivo']
    
    
    if medicoCambio and motivo:
        mongo.db.peticion.update_one({'_id': ObjectId(id)}, {'$set': {                                    
            'medicoCambio': medicoCambio,
            'motivo': motivo                    
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el medico'}) 
        return respuesta   

@Peticion.route('/solicitud/<id>', methods=['DELETE'])
def eliminarSolicitud(id):
    mongo.db.peticion.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el medico'}) 