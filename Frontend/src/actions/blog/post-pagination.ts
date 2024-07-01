// En el archivo actions.ts o donde tengas tus funciones de peticiones


export const getPaginatedPostsWithImages = async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
  try {

    

    
    const response = await fetch(`http://localhost:3001/posts`);

    if (!response.ok) {
      throw new Error('Error en la solicitud al backend');
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener posts:', error);
    return { currentPage: 1, totalPages: 1, posts: [] }; // Manejar el error según tus necesidades
  }
};

export const getPostById = async( id: string ) => {

  try {

    const response = await fetch(`${process.env.URL_BACKEND}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Error en la solicitud al backend');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return console.error('Error al obtener posts:', error);
    
  }

};
