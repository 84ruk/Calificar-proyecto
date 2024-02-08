// En el archivo actions.ts o donde tengas tus funciones de peticiones


export const getPaginatedPetsWithImages = async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}) => {
  try {



    
    const response = await fetch(`${process.env.URL_BACKEND}/pets?offset=${(page - 1) * limit}&limit=${limit}`, { next: { revalidate: 3600 * 60 } });

    if (!response.ok) {
      throw new Error('Error en la solicitud al backend');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    return { currentPage: 1, totalPages: 1, pets: [] }; // Manejar el error según tus necesidades
  }
};
