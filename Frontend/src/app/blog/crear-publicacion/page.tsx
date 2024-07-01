/* export const revalidate = 604800; //7 días */

import { Metadata, ResolvingMetadata } from "next";
import { getProfessorById } from "@/actions";
import { PublicacionForm } from "./ui/PublicacionForm";


export default async function Home( ) {



/*   const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedPetsWithImages({ page });





  import { useState } from 'react';

// Assuming you have an API route set up in Nest.js for handling blog post creation
const createBlogPost = async (data) => {
  const response = await fetch('/api/create-blog-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Error creating blog post');
  }

  return response.json(); // Handle successful response
};

export const PublicacionForm = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null); // Clear any previous errors
    setIsLoading(true); // Set loading state to true

    try {
      await createBlogPost({ titulo, descripcion });
      setTitulo(''); // Clear the form fields on success
      setDescripcion('');
    } catch (error) {
      setError(error.message); // Set the error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-5xl font-extrabold mb-6 text-center dark:text-white">Crear publicación</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message

      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="4"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading} // Disable button while submitting
        >
          {isLoading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  );
};






  if ( products.length === 0 ) {
    redirect('/');
  }
 */

  return (
    <div className=" w-full flex justify-center min-h-screen">
    <div className="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 className="text-5xl font-extrabold mb-6 text-center dark:text-white">Crear publicacion</h2>
     <PublicacionForm />
    </div>
  </div>
  );
}
