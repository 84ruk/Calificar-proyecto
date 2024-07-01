'use server'
import { cookies } from "next/headers";

export const submitComment = async (postId: string, comment: string): Promise<void> => {


    try {
      const cookieStore = cookies();
      const cookieValue = cookieStore?.get('token');
    
      const { value } = cookieValue;
      
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${value}`
        },
        body: JSON.stringify({ content: comment }),
        
      });
      
      
      if (!response.ok) {
        throw new Error('Error al enviar el comentario.');
      }

      
  
      // Puedes manejar cualquier lógica adicional aquí, como actualizar la UI después de un comentario exitoso.
    } catch (error) {
      console.log(error)
      throw new Error('Error al enviar el comentario: ' + error.message);
    }
  };
  