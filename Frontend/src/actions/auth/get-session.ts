// server.js
'use server';

import { useGetSessionStore } from '@/store';
import { sleep } from '@/utils';
import { cookies } from 'next/headers';

export async function getSession() {
  await sleep(2);
  const cookieStore = cookies();
  
  // Verifica si cookieStore existe y si get('token') no es undefined
  const cookieValue = cookieStore?.get('token');
  
  if (cookieValue) {
    // Si cookieValue existe, desestructura la propiedad 'value'
    const { value } = cookieValue;
    const url = `${process.env.URL_BACKEND}/auth/check-status`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${value}`
      },
    });

    
    const data = await response.json();
    return data;
  } else {

    console.log('El valor de la cookie "token" es undefined.');
    return null; // O devuelve algún valor predeterminado o lanza una excepción
  }
}
