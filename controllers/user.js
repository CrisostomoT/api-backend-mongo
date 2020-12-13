const User = require('../models/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

const getUser = async (req, res) => {
    try {
        const userId = req.params;

        const user = await User.findById(userId);

        if (user) {
            res.send({
                success: true,
                data: user
            })
        } else if (!user) {
            res.send({
                success: false,
                message: "Error: Usuario no encontrado."
            })
        } else {
            res.status(500).send({
                success: false,
                message: "Error, por favor intente mas tarde."
            })
        }
    } catch (err) {
        console.log(err)
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        if (users) {
            res.send({
                success: true,
                data: users
            })
        } else if (!users) {
            res.send({
                success: false,
                message: "Error: Usuarios no encontrados"
            })
        } else {
            res.status(500).send({
                success: false,
                message: "Error: por favor intente mas tarde."
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const addUser = async (req, res) => {
    try {
        const { username, password, name, lastName, email } = req.body;

        const registeredUser = await User.findOne({ username, email });

        if (registeredUser) {
            res.status(500).send({
                success: false,
                message: `El usuario ${registeredUser.username} y el e-mail ${registeredUser.email}, ya existen!`
            })
        }
        const rounds = parseInt(process.env.ROUNDS);
        const hash = await bcrypt.hash(password, rounds);

        const newUser = new User({
            name: name,
            lastName: lastName,
            username: username,
            email: email,
            password: hash
        })

        if (!newUser) {
            res.status(500).send({
                success: false,
                message: "Error al crear el usuario, revise los campos o intente mas tarde."
            })
        } else if (newUser) {
            res.send({
                success: true,
                data: newUser,
                message: "Usuario creado exitosamente."
            })
        }

        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, ...user } = req.params;
        const rounds = parseInt(process.env.ROUNDS);

        const dataToUpdate = {
            ...user,
            password: bcrypt.hash(req.body.password, rounds)
        }

        const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate)

        if (!updatedUser) {
            res.status(500).send({
                success: false,
                message: "Error al actualizar el usuario, por favor intente mas tarde."
            })
        } else if (updatedUser) {
            res.send({
                success: true,
                message: "Usuario actualizado."
            })
        }

        updatedUser.save()

    } catch (err) {
        console.log(err)
    }
}

const removeUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userDeleted = await User.findByIdAndDelete(id);

        if (!userDeleted) {
            res.status(500).send({
                success: false,
                message: "Error al borra el usuario."
            })
        } else if (userDeleted) {
            res.send({
                success: true,
                message: "Usuario borrado"
            })
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    getUser,
    getAllUsers,
    addUser,
    removeUser,
    updateUser
}