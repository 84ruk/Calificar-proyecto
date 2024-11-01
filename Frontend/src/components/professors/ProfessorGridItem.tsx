import { IoPersonSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { AiFillDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Professor } from "@/interfaces";
import Link from "next/link";

interface Props {
  professor: Professor;
}

export const ProfessorGridItem = ({ professor }: Props) => {
  const { id, name, lastName, averageRating, likes = 0, dislikes = 0, commentsCount = 0 } = professor;

  return (
    <article className="flex flex-col items-center h-full place-content-center p-4 border rounded-lg shadow-md">
      <header className="flex items-center mb-3">
        <IoPersonSharp className="text-xl mr-2" aria-label="Icono de persona" />
        <h2 className="text-lg font-semibold">{name} {lastName}</h2>
      </header>

      <div className="text-center">
        <p className="text-sm">Calificación promedio:</p>
        <p className="text-2xl font-bold antialiased">{averageRating}</p>
      </div>

      <div className="flex items-center justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <BiSolidLike className="mr-1" aria-label="Icono de likes" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center">
          <AiFillDislike className="mr-1" aria-label="Icono de dislikes" />
          <span>{dislikes}</span>
        </div>
        <div className="flex items-center">
          <FaRegComment className="mr-1" aria-label="Icono de comentarios" />
          <span>{commentsCount}</span>
        </div>
      </div>

      <Link className="mt-4 btn-primary rounded-sm text-center mx-auto btn-primary text-white px-4 py-2" href={`/profesores/${id}`}>
       Ver detalles
      </Link>
    </article>
  );
};
