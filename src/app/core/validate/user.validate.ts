export const USER_LOGIN_VALIDATION = {
    "email": {
        "required": "El correo es obligatorio",
        "email": "El formato del correo no es válido"
    },
    "password": {
        "required": "La contraseña es obligatoria",
        "minlength": "La contraseña debe tener al menos 6 caracteres"
    },
};

export const USER_REGISTRATION_VALIDATION = {
    "fullName": {
        "required": "El nombre completo es obligatorio",
        "minlength": "El nombre completo debe tener al menos 5 caracteres"
    },
    "email": {
        "required": "El correo es obligatorio",
        "email": "El correo no tiene un formato válido"
    },
    "password": {
        "required": "La contraseña es obligatoria",
        "minlength": "La contraseña debe tener al menos 8 caracteres"
    }
}