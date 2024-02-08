'use client';
// pages/index.tsx

import { FaHeart, FaBolt, FaRuler } from 'react-icons/fa';

import { Pet } from '@/interfaces';
import { IoMdPin } from 'react-icons/io';

interface Props {
  pet: Pet;
}


export const PetGridItem = ( { pet }: Props ) => {
  const {
    id,
    isAvailable,
    name,
    location,
    energyLevel,
    affectionLevel,
    breedSize,
    personalityTraits,
    description,
    imageUrl,
  } = pet;

  const renderProgressBar = (level) => {
    const maxLevel = 3;
    const percentage = (level / maxLevel) * 100;

    return (
      <div className="relative w-full h-4 bg-white rounded-md shadow-md overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all ease-out duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="pet-grid-item bg-white shadow-md rounded-md p-6">
    <div className="pet-image-container mb-4">
      <img src={imageUrl} alt={name} className="w-full h-auto rounded-md" />
    </div>
    <div className="pet-info">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-500"> <IoMdPin  className="inline-block ml-1 mb-1 text-black" /> {location}</p>
      
      {/* Niveles de Energía y Afecto */}
      <div className="level-section mt-2">
        <p className="font-semibold">Niveles</p>
        <div className="flex flex-col space-y-2">
          <div>
            <p className="text-gray-700"><FaBolt className="inline-block ml-1 mb-1 text-black" /> Energía:</p>
            {renderProgressBar(energyLevel)}
          </div>
          <div>
            <p className="text-gray-700"><FaHeart className="inline-block ml-1 mb-1 text-black" /> Afecto:</p>
            {renderProgressBar(affectionLevel)}
          </div>
        </div>
      </div>

      {/* Detalles adicionales */}
      <div className="details-section mt-4">
        <p className="text-gray-700"><FaRuler className="inline-block ml-1 mb-1 text-black" /> {`Tamaño de raza: ${breedSize}  `} </p>
        <p className="text-gray-700">{`Personalidad: ${personalityTraits}`}</p>
      </div>

      <p className="text-gray-700 mt-4">{description}</p>

      {/* Botón de Adopción */}
      <button
        className={`bg-green-500 text-white px-6 py-3 rounded-md mt-4 ${
          !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={!isAvailable}
      >
        Adoptar ahora
      </button>
    </div>
  </div>
  );
  };
  
