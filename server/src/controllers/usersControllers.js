const { Op } = require("sequelize");
const { User } = require("../db");
const { transporter } = require("../../utils/transporter");
const { generateWelcomeEmail } = require("../../utils/emailTemplates");
const { MAIL_USERNAME } = process.env;

// Controler encargado de crear los usuarios.
const createUserController = async (name, email, subAfterPipe) => {
  try {
    // Creamos una validación para que verifique si el usario ya existe por su propiedad email.
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExists) {
      // Si el usuario ya existe, simplemente retornamos el usuario existente.
      return {
        message: "Usuario ya existe, continuando con el inicio de sesión.",
        userExists,
      };
    }

    const sub = subAfterPipe;
    const allUsers = await User.create({ name, email, sub });

    const affair = "¡ Bienvenido a nuestro gimnasio !";
    const htmlBody = generateWelcomeEmail(name);

    await transporter.sendMail({
      from: MAIL_USERNAME,
      to: email,
      subject: affair,
      html: htmlBody,
    });

    return { message: "Usuario creado con exito.", allUsers };
  } catch (error) {
    // Mostramos cualquier error que ocurra durante la creación del usuario.
    throw new Error(`Error al crear el usuario: ${error.message}.`);
  }
};

// En este controller podemos actualizar la información de un usuario.
const updateUserController = async (id, newData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado.");
    }

    // Actualizamos la información del usuario.
    await user.update(newData);

    return { message: "Usuario actualizado exitosamente." };
  } catch (error) {
    throw new Error(`Error al actualizar el usuario: ${error.message}`);
  }
};

// Controller que busca todos los usarios que esten activos.
const getActiveUsersController = async () => {
  try {
    const users = await User.findAll({
      where: {
        // Traemos solo los usuarios que estan activos.
        status: true,
      },
      order: [
        // Le decimos que los resultados deben venir ordenados alfabéticamente por el nombre.
        ["name", "ASC"],
      ],
    });

    if (users.length === 0) {
      throw new Error("No existen usuarios activos.");
    }

    return { Items: users };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller que nos trae los usuarios que esten inactivos/eliminados.
const getInactiveUsersController = async () => {
  try {
    const inactiveUsers = await User.findAll({
      // Que su propiedad active este en "false" y los muestre en orden alfabético.
      where: {
        status: false,
      },
      order: [["name", "ASC"]],
    });

    if (inactiveUsers.length === 0) {
      throw new Error("No existen usuarios inactivos.");
    }

    return { Items: inactiveUsers };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller que nos trae solo un usuario por su nombre.
const getUserByNameController = async (name) => {
  try {
    const userByName = await User.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Lo usamos para realizar comparaciones de cadenas sin distinción entre mayúsculas y minúsculas.
        },
      },
    });

    if (userByName.length === 0) {
      throw new Error("No existe un usuario con ese nombre.");
    }

    return userByName;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Controller que muestra info especifica de un usuario por su id.
const getUserByIdController = async (id) => {
  try {
    const userById = User.findByPk(id, {
      attributes: ["name", "email", "is_admin", "status", "sub"],
    });
    return userById;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserController,
  getActiveUsersController,
  getUserByNameController,
  updateUserController,
  getInactiveUsersController,
  getUserByIdController,
};
