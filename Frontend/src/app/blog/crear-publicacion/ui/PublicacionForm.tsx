'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { createBlogPost } from '@/actions/blog/create-post';
import ErrorMessages from '@/components/ui/error/ErrorMessages';
import { useRouter } from 'next/navigation';

export const PublicacionForm = () => {

  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setErrorMessages([]);
    try {
      const resp = await createBlogPost(data);


      
    if(resp.error){
        setErrorMessages(resp.message);

        return
      }

      router.push(`/blog/${resp.id}`);

      
    } catch (error) {
      console.log(error)
      setErrorMessages(['Error en el servidor, intente mas tarde o contacte a un administrador.']);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white p-8 rounded-lg w-full max-w-md mx-auto">
      {errorMessages.length > 0 && <ErrorMessages messages={errorMessages} />} {/* Muestra mensajes de error */}
      
      <div className="mb-4">
        <label htmlFor="titulo" className="block font-semibold text-gray-700">Título</label>
        <input
          type="text"
          id="titulo"
          {...register('title', { 
            required: 'El título es obligatorio', 
            minLength: { value: 1, message: 'El título es muy corto. Debería tener mínimo 5 caracteres.' }
          })}
          className={clsx(
            "font-medium mt-1 block w-full px-3 py-2 shadow-lg rounded-md focus:outline-none sm:text-sm",
            {
              'border-red-500': errors.title,
              'border-gray-300': !errors.title,
            }
          )}
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="descripcion" className="block font-semibold text-gray-700">Descripción</label>
        <textarea
          id="descripcion"
          {...register('content', { 
            required: 'El contenido es obligatorio', 
            minLength: { value: 0, message: 'El contenido es muy corto. Debería tener mínimo 10 caracteres.' }
          })}
          rows="4"
          className={clsx(
            "font-medium mt-1 block w-full px-3 py-2 shadow-lg rounded-md focus:outline-none sm:text-sm",
            {
              'border-red-500': errors.content,
              'border-gray-300': !errors.content,
            }
          )}
        ></textarea>
        {errors.content && <span className="text-red-500">{errors.content.message}</span>}
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  );
};
