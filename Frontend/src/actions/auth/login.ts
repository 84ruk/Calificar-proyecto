// server.js
'use server'

import { sleep } from '@/utils';
import { cookies } from 'next/headers'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  try {

    await sleep(1)
    
    const email = formData.get('email');
    const password = formData.get('password');

    const requestBody = { email, password };
    //${process.env.URL_BACKEND}
    const response = await fetch(`http://localhost:3001/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Error en la autenticación');
    }



    const { token, ...data } = await response.json();

    
    cookies().set({
      name: 'token', 
      value: token, 
      httpOnly: true, 
      sameSite: 'lax', // o 'strict' dependiendo de tus necesidades
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      });
    

    
    // Guardar el token o realizar otras acciones según tu lógica
    // signIn(data.token);
    
    return 'Success';
  } catch (error) {
    console.log('Error de autenticación:', error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };

}
}