'use server'
import { cookies } from 'next/headers';


// lib/api.ts
export const fetchPostById = async (id: string) => {

    try {

        
        const cookieStore = cookies();
        const cookieValue = cookieStore?.get('token');
        const { value } = cookieValue;
        const response = await fetch(`http://localhost:3001/posts/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${value}`
            }
        });
        /* console.log(response)  DA ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR POR QUEEEEE, DA ERRPR INVESTIGAR SI ES NORMAL O NO DEBE DE IR AQUI EL CONSOLE LOG*/
        console.log(response)
        if (!response.ok) {
          throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        return console.error('Error al obtener posts:', error);
        
      }

  };
  