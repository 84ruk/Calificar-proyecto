import { Product } from '@/interfaces';
import { PetGridItem } from './PetGridItem';

interface Props {
  pets: Pet[];
}


export const PetGrid = ( { pets }: Props ) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10 p-5">
      {
        pets.map( pet => (
          <PetGridItem
            key={ pet.id }
            pet={ pet }
          />
        ) )
      }

    </div>
  );
};