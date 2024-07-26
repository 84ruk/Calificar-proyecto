'use server';

import { cookies } from 'next/headers'

export async function logout() {
  try {
    // Elimina la cookie del token
    cookies().set({
      name: 'token',
      value: '',
      expires: new Date(0), // Expirar inmediatamente
      httpOnly: true,
      sameSite: 'lax', // o 'strict' dependiendo de tus necesidades
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return 'Logout successful';
  } catch (error) {
    console.log('Error during logout:', error);
    return {
      ok: false,
      message: 'No se pudo cerrar sesión',
    };
  }
}