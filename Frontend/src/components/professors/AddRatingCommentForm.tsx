'use client';

import React, { useState } from 'react';
import { Rating } from "@material-tailwind/react";
import { RatingCommentDto } from '@/interfaces';
import { addRatingComment } from '@/actions/rating/addRatingComment';
import ErrorMessages from '../ui/error/ErrorMessages';
import SuccessMessages from '../ui/success/SuccessMessages';

const characteristicsOptions = [
  'Puntual', 
  'Enojon', 
  'Divertido', 
  'Respetuoso', 
  'Amable',
  'Ordinario',
  'Excelente',
  'Amistoso'
];

interface AddRatingCommentFormProps {
  professorId: string;
  fullName: string;
  professorDetails: ProfessorDetails; // Add this prop to get professor details
}

const AddRatingCommentForm = ({ professorId, fullName, professorDetails }: AddRatingCommentFormProps) => {
  
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [characteristics, setCharacteristics] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successMessages, setSuccessMessages] = useState<string>([]);

  const handleCharacteristicChange = (characteristic: string) => {
    setCharacteristics((prevCharacteristics) =>
      prevCharacteristics.includes(characteristic)
        ? prevCharacteristics.filter((c) => c !== characteristic)
        : [...prevCharacteristics, characteristic]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setErrorMessages([]);
    e.preventDefault();

    const ratingCommentDto: RatingCommentDto = {
      comment,
      rating,
      professor: professorDetails, 
      professorCharacteristics: characteristics,
    };

    try {
      const result = await addRatingComment(professorId, ratingCommentDto);



      setComment('');
      setRating(0);
      setCharacteristics([]);
      setSuccessMessages(['Comentario agregado con éxito!']);
      setErrorMessages([]);
    } catch (error) {
      console.error('Error adding comment:', error);
    
      if (error.message === 'Necesita iniciar sesión para agregar un comentario.') {
        setErrorMessages(['Debe iniciar sesión para agregar un comentario.']);
      } else {
        setErrorMessages(['Error al agregar el comentario']);
      }
      
      setSuccessMessages([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-1 pb-4 bg-white shadow-md rounded-md">
      <p className="font-bold text-2xl mt-5">Calificar a {fullName}</p>

      {errorMessages.length > 0 && <ErrorMessages messages={errorMessages} />}
      {successMessages.length > 0 && <SuccessMessages messages={successMessages} />}

      <div className="mb-4 mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tu comentario"
          required
          className="font-medium mt-1 block w-full px-3 py-2 shadow-lg rounded-md focus:outline-none sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <div className="overflow-x-auto whitespace-nowrap py-2 px-2 bg-gray-100 rounded-lg shadow-inner">
          {characteristicsOptions.map((characteristic) => (
            <div
              key={characteristic}
              onClick={() => handleCharacteristicChange(characteristic)}
              className={`inline-block px-4 py-2 m-1 rounded cursor-pointer shadow transition-colors duration-300 ${
                characteristics.includes(characteristic)
                  ? 'bg-blue-200'
                  : 'bg-gray-200 text-black hover:bg-blue-200'
              }`}
            >
              {characteristic}
            </div>
          ))}
        </div>
      </div>

      {characteristics.length > 0 && (
        <div className="mb-4">
          <p className="font-bold">Características seleccionadas:</p>
          <div className="flex flex-wrap gap-2">
            {characteristics.map((characteristic) => (
              <div
                key={characteristic}
                className="inline-block px-4 py-2 rounded bg-blue-500 text-white shadow"
              >
                {characteristic}
              </div>
            ))}
          </div>
        </div>
      )}

      

      <div className="my-4 flex justify-center">
        <Rating
          value={rating}
          onChange={(newRating) => setRating(newRating)}
          className="text-yellow-500 flex"
        />
      </div>
      
      <button type="submit" className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-400 transition">
        Agregar Calificación
      </button>
    </form>
  );
};

export default AddRatingCommentForm;
