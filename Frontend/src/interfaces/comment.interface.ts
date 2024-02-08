import { ProfessorDetails } from ".";


export interface Comment {
  id: string;
  comment: string;
  rating: number;
  professor: ProfessorDetails;
}
