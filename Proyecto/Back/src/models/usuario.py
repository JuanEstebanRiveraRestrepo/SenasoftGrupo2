from bson.objectid import ObjectId
from flask import Blueprint, jsonify
from bson import json_util
from flask.globals import request
from werkzeug.security import generate_password_hash, check_password_hash  


from conexion import mongo

Usuario = Blueprint('usuario', __name__)

@Usuario.route('/usuario')
def obtenerUsuario():
    usuarios = mongo.db.usuario.find()
    respuesta = json_util.dumps(usuarios)
    
    return respuesta 

@Usuario.route('/usuario', methods=['POST'])
def creaUsuario():
    correo = request.json['correo']
    password = request.json['password']
    rol = request.json['rol']
        
    if correo and password and rol: 
        passwordCifrado = generate_password_hash(password)
        mongo.db.usuario.insert({        
            'correo': correo,
            'password': passwordCifrado,
            'rol': rol            
        })
        
        return jsonify({'mensaje': 'Se agrego usuario'}) 

@Usuario.route('/usuario/<id>')
def buscarUsuario(id):
    rol = mongo.db.usuario.find_one({'_id': ObjectId(id)})
    respuesta = json_util.dumps(rol)
    return respuesta
    
@Usuario.route('/usuario/<id>', methods=['PUT'])
def editarUsuario(id):
    correo = request.json['correo']
    password = request.json['password']
    rol = request.json['rol']
    
    
    if correo and password and rol: 
        passwordCifrado = generate_password_hash(password)
        mongo.db.usuario.update_one({'_id': ObjectId(id)}, {'$set': {            
            'correo': correo,
            'password': passwordCifrado,
            'rol': rol        
        }})            
        
        respuesta = jsonify({'mensaje': 'se edito el usuario'}) 
        return respuesta   

@Usuario.route('/usuario/<id>', methods=['DELETE'])
def eliminarUsuario(id):
    mongo.db.usuario.delete_one({'_id': ObjectId(id)})
    return jsonify({'mensaje': 'se elimino el usuario'}) 