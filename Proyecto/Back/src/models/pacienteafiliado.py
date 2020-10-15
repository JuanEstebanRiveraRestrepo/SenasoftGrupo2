from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request

from conexion import mongo
from models.pacientefamiliar import crearPacienteFamiliar

from flask_cors import CORS

PacienteAfiliado = Blueprint('pacienteaf', __name__)

CORS(PacienteAfiliado)

#Ruta y Metodo para obtener pacientes afiliado
@PacienteAfiliado.route('/pacienteaf')
def obtenerPacienteAfiliado():
    pacienteafiliados = mongo.db.pacienteafiliado.find()
    respuesta = json_util.dumps(pacienteafiliados)
    
    return respuesta 

#Ruta y Metodo para crear paciente afiliado
@PacienteAfiliado.route('/pacienteaf', methods=['POST'])
def crearPacienteAfiliado():
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


#Ruta y Metodo para buscar paciente afiliado
@PacienteAfiliado.route('/pacienteaf/<id>')
def buscarPacienteAfiliado(id):
    pacienteafiliado = mongo.db.pacienteafiliado.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(pacienteafiliado)
    return respuesta
      
#Ruta y Metodo para editar paciente afiliado
@PacienteAfiliado.route('/pacienteaf/<id>', methods=['PUT'])
def editarPacienteAfiliado(id):
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

#Ruta y Metodo para eliminar paciente afiliado
@PacienteAfiliado.route('/pacienteaf/<id>', methods=['DELETE'])
def eliminarPacienteAfiliado(id):
    mongo.db.pacienteafiliado.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el paciente afiliado'}) 


#Ruta y Metodo para crear un paciente de la familia 
@PacienteAfiliado.route('/pacienteaf/<id>', methods=['POST'])
def crearPacienteFamiliarDelTitula(id):
    crearPacienteFamiliar(id)
    
    
#Ruta y Metodo para buscar el grupo familiar de ese paciente
@PacienteAfiliado.route('/pacienteaf/grupo/<id>')
def buscarGrupoFamiliar(id):    
    grupofamiliar = mongo.db.pacientefamiliar.find({'titular': id})
    respuesta = json_util.dumps(grupofamiliar)
    return respuesta

@PacienteAfiliado.route('/pacienteaf/doctor/<id>', methods=['PUT'])
def cambiarDoctor(id):
    grupofamiliar = mongo.db.pacientefamiliar.find({'titular': id})
    respuesta = json_util.dumps(grupofamiliar)
    
    medico = request.json['medico']
    
    if medico:
        mongo.db.pacientefamiliar.update({'titular': id}, {'$set':{
            'medico': medico
        }})
        
        respuesta = jsonify("se actualizo el doctor del grupo familair")
    return respuesta 
    
    
@PacienteAfiliado.route('/iniciosesion/<correo>')
def iniciarSesion(correo):         
        
    usuario = mongo.db.usuario.find_one({'correo': correo})
    respuesta = json_util.dumps(usuario)
    return respuesta
    