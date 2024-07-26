'use server'
import { cookies } from 'next/headers';


// lib/api.ts
export const fetchPostById = async (id: string) => {

    try {


        const response = await fetch(`http://localhost:3001/posts/${id}`, {
            method: 'GET',
            
        });
        if (!response.ok) {
          throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json();
        return result;
      } catch (error) {
        return console.error('Error al obtener posts:', error);
        
      }

  };
  