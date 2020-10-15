from bson.objectid import ObjectId
from flask import Blueprint, jsonify, request
from bson import json_util


import json

from conexion import mongo


DocumentosHistorial = Blueprint('documentoshistorial', __name__)

#Ruta y Metodo para obtener medicos
@DocumentosHistorial.route('/documentoshistorial')
def obtenerHistorialmedicos():
    documentoshistorial = mongo.db.documentoshistorial.find()
    respuesta = json_util.dumps(documentoshistorial)
    
    return respuesta 

#Ruta y Metodo para crear un medico
@DocumentosHistorial.route('/documentoshistorial/<id>', methods=['POST'])
def crearHistorialmedico(id):    
    resultado = json.dumps(mongo.db.historialmedico.find_one({'paciente': id},{'_id':0,'fecha': 0  } ))    
    pacienteencode = json.loads(resultado)        
    paciente = pacienteencode['paciente']    
    enfermedades = request.json['enfermedades']        
    estadopaciente = request.json['estadopaciente']    
        
    # Validación para quitar la especialidad en caso de que el cargo sea medico general
    if paciente and medico and fecha:          
            
        mongo.db.historialmedico.insert({        
            'paciente': paciente,
            'enfermedades': enfermedades,
            'medico': medico,
            'fecha': fecha, 
            'estadopaciente': estadopaciente          
            
        })
        
        return jsonify({'mensaje': 'Se agrego historialmedico'}) 

#Ruta y Metodo para buscar medico
@DocumentosHistorial.route('/documentoshistorial/<id>')
def buscarHistorialmedico(id):
    medico = mongo.db.historialmedico.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(medico)
    return respuesta
    
#Ruta y Metodo para editar medico
# @Historialmedico.route('/historialmedico/<id>', methods=['PUT'])
# def editarHistorialmedico(id):
#     resultado = json.dumps(mongo.db.pacienteafiliado.find_one({'_id': ObjectId(id)}, {'medico':1, '_id':0}))
#     pacienteencode = json.loads(resultado)        
#     medico = pacienteencode['medico']
#     now = datetime.now()
#     paciente = id
#     enfermedades = request.json['enfermedades']    
#     fecha = "{}/{}/{}".format(now.day,now.month,now.year)
#     estadopaciente = request.json['estadopaciente']  
    
#     if paciente and medico and fecha:  
        
#         #Validación para quitar la especialidad en caso de que el cargo sea medico general       
#         mongo.db.historialmedico.update_one({'_id': ObjectId(id)}, {'$set': {                                  
#             'paciente': paciente,
#             'enfermedades': enfermedades,
#             'medico': medico,
#             'fecha': fecha, 
#             'estadopaciente': estadopaciente        
#         }})            
        
#         respuesta = jsonify({'mensaje': 'se edito el historialmedico'}) 
#         return respuesta   

#Ruta y Metodo para eliminar medico
@DocumentosHistorial.route('/documentoshistorial/<id>', methods=['DELETE'])
def eliminarHistorialmedico(id):
    mongo.db.historialmedico.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el historialmedico'}) 



