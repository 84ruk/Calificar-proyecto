export interface ProfessorResponse {
  profes: Professor[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface ProfessorDetails {
  id: string;
  name: string;
  lastName: string;
  averageRating: number;
  comments: Comment[];
}
