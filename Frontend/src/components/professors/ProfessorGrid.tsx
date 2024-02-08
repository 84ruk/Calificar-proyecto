import { Professor } from '@/interfaces';
import { ProfessorGridItem } from './ProfessorGridItem';

interface Props {
  proffessors: Professor[];
}


export const ProfessorGrid = ( { proffessors }: Props ) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
        {proffessors.map((professor) => (
          <div className="bg-white shadow-lg rounded-lg p-6 w-72 h-48 mx-auto my-auto align-middle items-center text-center" key={professor.id}>

            <ProfessorGridItem key={professor.id} professor={professor} />
          </div>
        ))}
      </div>
    </div>


  );
};