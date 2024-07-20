'use client';

import { submitComment } from '@/actions/blog/create-comment-post';
import { useForm } from 'react-hook-form';


interface CommentFieldProps {
  postId: string;
}

const CommentField: React.FC<CommentFieldProps> = ({ postId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    const { comment } = data;

    if (comment.length < 4) {
      return;
    }

    try {
      await submitComment(postId, comment); // Llama a la función para enviar el comentario
      reset(); // Reinicia el formulario después de enviar el comentario exitosamente
    } catch (err) {
      console.error('Error al enviar el comentario.', err);
      // Maneja el error como desees, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
      <textarea
        className="w-full p-2 bg-gray-100 rounded-md focus:outline-none"
        rows={4}
        placeholder="Escribe tu comentario aquí..."
        {...register('comment', { required: 'El comentario no puede estar vacío.' })}
      ></textarea>
      {errors.comment && <p className="text-red-500 mt-2">{errors.comment.message}</p>}
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Enviar comentario
      </button>
    </form>
  );
};

export default CommentField;