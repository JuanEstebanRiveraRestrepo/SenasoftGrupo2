from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request
import json

from conexion import mongo

Peticion = Blueprint('peticion', __name__)

@Peticion.route('/peticion')
def obtenerPeticion():
    peticiones = mongo.db.peticion.find()
    respuesta = json_util.dumps(peticiones)
    
    return respuesta 

@Peticion.route('/peticion/<id>', methods=['POST'])
def crearPeticion(id):     
    paciente = id
    
    resultado = json.dumps(mongo.db.pacienteafiliado.find_one({'_id': ObjectId(id)}, {'medico': 1, '_id': 0}))
    pacienteencode = json.loads(resultado)       
    print(pacienteencode) 
    medico = pacienteencode['medico']
    mensaje = request.json['mensaje']
    
            
    if paciente and medico and mensaje:         
        mongo.db.peticion.insert({                                     
            'paciente': id,
            'medico': medico,
            'mensaje': mensaje                                     
        })   
                                             
    return jsonify({'mensaje': 'Se agrego la peticion'}) 
    

@Peticion.route('/peticion/<id>')
def buscarPeticion(id):
    medico = mongo.db.peticion.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(medico)
    return respuesta
    
@Peticion.route('/peticion/<id>', methods=['PUT'])
def editarPeticion(id):            
    medicoCambio = request.json['medicoCambio']
    motivo = request.json['motivo']
    
    
    if medicoCambio and motivo:
        mongo.db.peticion.update_one({'_id': ObjectId(id)}, {'$set': {                                    
            'medicoCambio': medicoCambio,
            'motivo': motivo                    
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito la peticion'}) 
        return respuesta   

@Peticion.route('/peticion/<id>', methods=['DELETE'])
def eliminarPeticion(id):
    mongo.db.peticion.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino la peticion'}) 