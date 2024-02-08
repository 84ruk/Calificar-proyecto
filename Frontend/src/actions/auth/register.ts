'use server'

import prisma from '@/lib/prisma';
import bcrypt from "bcrypt";

export const registerUser = async( name: string, email: string, password: string ) => {
  try {
    // Hashea la contraseña antes de enviarla al backend

    // Construye el objeto de usuario para enviar al backend
    const user = {
      fullName: name,
      email,
      password
    };

    // Realiza una solicitud POST al endpoint correspondiente del backend
    const response = await fetch(`http://localhost:3001/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    // Maneja la respuesta del servidor
    if (response.ok) {
      // Si la respuesta es exitosa, retorna los datos del usuario y el token
      const responseData = await response.json();
      return responseData;
    } else {
      // Si la respuedsasta no es exitosa, maneja el error
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear la cuenta');
    }
  } catch (error) {
    console.error('Error en la creación de la cuenta:', error);
    // Puedes lanzar el error nuevamente o manejarlo de otra manera según tus necesidades
  }
};