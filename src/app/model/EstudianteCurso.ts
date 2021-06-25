import { Curso } from "./Curso";
import { Estudiante } from "./Estudiante";

export class EstudianteCurso {
    id?: number | undefined;
    cursoId: number | undefined;
    estudianteId: number | undefined;
    estudiante: Estudiante | undefined;
    curso: Curso | undefined;
}