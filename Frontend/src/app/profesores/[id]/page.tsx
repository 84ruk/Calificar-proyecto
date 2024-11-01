/* export const revalidate = 604800; //7 días */

import { Metadata, ResolvingMetadata } from "next";
import { getProfessorById } from "@/actions";
import AddRatingCommentForm from "@/components/professors/AddRatingCommentForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const id = params.id;
    const professor = await getProfessorById(id);
    return {
      title: professor
        ? `Opiniones sobre ${professor.name} - ${professor.rating} estrellas`
        : "Profesor no encontrado",
    };
  } catch (error) {
    console.error('Error en generateMetadata:', error);
    return { title: "Profesor no encontrado" };
  }
}

export default async function Home({ params }: Props) {
  const professor = await getProfessorById(params.id);

  if (!professor) {
    redirect('/');
  }

  const { id, name, lastName, averageRating, comments } = professor;
  const fullName = `${name} ${lastName}`;

  const characteristics = comments.reduce((acc, comment) => {
    comment.professorCharacteristics.forEach((characteristic) => {
      acc[characteristic] = (acc[characteristic] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto rounded-md shadow-md">
      <h2 className="text-5xl font-bold w-full text-center">{fullName}</h2>
      <div className="flex flex-col md:flex-row p-5">
        <div className="text-center md:text-left flex-wrap items-center md:w-1/2 gap-5 mb-5">
          <p className="mt-5 md:ml-7">Calificación promedio:</p>
          <p className="font-bold text-4xl md:ml-24">{averageRating}</p>

          {Object.keys(characteristics).length > 0 && (
            <>
              <p className="font-bold text-2xl mt-5">Características</p>
              <div className="flex-wrap w-full">
                {Object.entries(characteristics).map(([characteristic, count]) => (
                  <p
                    key={characteristic}
                    className="mt-3 px-2 py-1 bg-slate-400/50 w-fit rounded hover:cursor-pointer mx-2 bg-gray-200 text-black font-semibold"
                  >
                    {characteristic} ({count})
                  </p>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="text-center p-5 md:text-left w-full flex-col items-center md:w-1/2">
          <AddRatingCommentForm professorId={id} fullName={fullName} />
        </div>
      </div>

      {comments.length > 0 ? (
        <div className="text-center p-5 md:text-left w-full flex flex-col items-center">
          {comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="shadow-md p-4 mb-6 rounded-lg flex flex-col md:flex-row bg-white space-y-4 md:space-y-0 md:space-x-4 w-full items-center md:items-start"
            >
              <div className="md:w-2/3 flex flex-col space-y-2 items-center md:items-start">
                <p className="text-gray-800 text-lg font-medium">
                  {comment.comment}
                </p>
                <div className="text-gray-600 mt-2 font-medium flex flex-wrap gap-2 justify-center md:justify-start">
                  {comment.professorCharacteristics.map(
                    (characteristic, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-md bg-gray-200 text-black font-semibold"
                      >
                        {characteristic}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="md:w-1/3 lg:w-full mx-auto flex items-center justify-center ">
                <p className="font-bold text-4xl text-yellow-500">
                  {comment.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 p-5">
          No hay comentarios disponibles.
        </p>
      )}
    </div>
  );
}
