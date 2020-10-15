from bson.objectid import ObjectId
from flask import Blueprint, jsonify, request
from bson import json_util



from conexion import mongo
from flask_mail import Mail, Message


Medico = Blueprint('medico', __name__)

#Ruta y Metodo para obtener medicos
@Medico.route('/medico')
def obtenerMedicos():
    medicos = mongo.db.medico.find()
    respuesta = json_util.dumps(medicos)
    
    return respuesta 

#Ruta y Metodo para crear un medico
@Medico.route('/medico', methods=['POST'])
def crearMedico():
    
    cedula = request.json['cedula']
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    cargo = request.json['cargo']
    especialidad = request.json['especialidad']
        
    #Validación para quitar la especialidad en caso de que el cargo sea medico general
    if cedula and nombre and cargo and telefono:  
        if cargo == 'medico general':
            especialidad = ''
            
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

#Ruta y Metodo para buscar medico
@Medico.route('/medico/<id>')
def buscarMedico(id):
    medico = mongo.db.medico.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(medico)
    return respuesta
    
#Ruta y Metodo para editar medico
@Medico.route('/medico/<id>', methods=['PUT'])
def editarMedico(id):
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    cargo = request.json['cargo']
    especialidad = request.json['especialidad']
    
    
    if nombre and cargo and telefono:
        
        #Validación para quitar la especialidad en caso de que el cargo sea medico general
        if cargo == 'medico general':
            especialidad = ''
        mongo.db.medico.update_one({'_id': ObjectId(id)}, {'$set': {                                  
            'nombre': nombre,
            'apellido': apellido,
            'telefono': telefono, 
            'direccion': direccion,
            'cargo': cargo,
            'especialidad': especialidad        
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el medico'}) 
        return respuesta   

#Ruta y Metodo para eliminar medico
@Medico.route('/medico/<id>', methods=['DELETE'])
def eliminarMedico(id):
    mongo.db.medico.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el medico'}) 

#Ruta y Metodo para buscar pacientes de un medico
@Medico.route('/medico/pacientes/<id>')
def buscarPacientesMedico(id):
    pacientes = mongo.db.pacienteafiliado.find({'medico': id})
    respuesta = json_util.dumps(pacientes)
    return respuesta
    

