// server.js
'use server';
// Importa el store de Zustand o el equivalente
import { useAuthStore } from '@/store';
import { cookies } from 'next/headers';

export async function getSession() {


  try {

    // Si no hay datos de sesión en el almacenamiento en caché, realiza la petición al backend
    const cookieStore = cookies();
    const cookieValue = cookieStore?.get('token');

    if (!cookieValue) {
      return { isAuthenticated: false };
    }

    const { value } = cookieValue;
    const url = `${process.env.URL_BACKEND}/auth/check-status`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${value}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`API request failed: ${data.message || 'Internal server error'}`);
    }

    const data = await response.json();


    return { isAuthenticated: true, userData: data };
  } catch (error) {
    console.log(error)
    return null; // O devuelve un valor predeterminado basado en la lógica de tu aplicación
  }
}
