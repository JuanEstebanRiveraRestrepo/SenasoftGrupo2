from typing import Any
from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request
from werkzeug.security import generate_password_hash, check_password_hash  


from conexion import mongo

Usuario = Blueprint('usuario', __name__)


#Ruta y Metodo para obtener usuarios
@Usuario.route('/usuario')
def obtenerUsuario():
    usuarios = mongo.db.usuario.find()
    respuesta = json_util.dumps(usuarios)
    
    return respuesta 

#Ruta y Metodo para crear usuario
@Usuario.route('/usuario', methods=['POST'])
def crearUsuario():
    correo = request.json['correo']
    password = request.json['password']
    rol = request.json['rol']
    
    #Validación para poner el rol predeterminado en caso de que se registre un paciente
    if not rol:
        rol = "paciente titular" 
                        
    if correo and password and rol: 
        passwordCifrado = generate_password_hash(password)
        mongo.db.usuario.insert({        
            'correo': correo,
            'password': passwordCifrado,
            'rol': rol            
        })
        
        return jsonify({'mensaje': 'Se agrego usuario'}) 

#Ruta y Metodo para buscar un usuario
@Usuario.route('/usuario/<id>')
def buscarUsuario(id):
    rol = mongo.db.usuario.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(rol)
    return respuesta
    
#Ruta y Metodo para editar usuario
@Usuario.route('/usuario/<id>', methods=['PUT'])
def editarUsuario(id):
    correo = request.json['correo']    
    password = request.json['password']
    
    if correo:         
        mongo.db.usuario.update_one({'_id': ObjectId(id)}, {'$set': {            
            'correo': correo,            
            'password':password
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el usuario'}) 
        return respuesta   

#Ruta y Metodo para eliminar usuario
@Usuario.route('/usuario/<id>', methods=['DELETE'])
def eliminarUsuario(id):
    mongo.db.usuario.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el usuario'}) 

#Ruta y Metodo para validar usuario por correo
@Usuario.route('/usuario/validar/<correo>')
def validarUsuarioPorCorreo(correo):         
    return mongo.db.usuario.find_one({'correo': correo}, {'correo': 1, '_id': 0})