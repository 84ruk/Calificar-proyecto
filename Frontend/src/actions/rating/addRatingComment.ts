'use server'
import { cookies } from "next/headers";

import { Comment } from '@/interfaces';


export async function addRatingComment(professorId: string, ratingCommentDto: Comment) {
  try {
    const cookieStore = cookies();
    const cookieValue = cookieStore?.get('token');

    if (!cookieValue) {
      throw new Error('Necesita iniciar sesión para agregar un comentario.');
    }

    const { value } = cookieValue;

    const response = await fetch(`http://localhost:3001/professors/${professorId}/ratings-comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${value}`
      },
      body: JSON.stringify(ratingCommentDto),
    });

    if (!response.ok) {
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en addRatingComment:', error);
    throw new Error(error.message || 'Error al agregar el comentario');
  }
}
