import { Calificacion } from "./Calificacion";
import { Estudiante } from "./Estudiante"

export class CalificacionEstudiante {
    id?: number;
    estudiantesId?: number;
    estudiante?: Estudiante;
    calificacionesId?: number;
    calificaciones?: Calificacion;
    nota?: number;
    constructor() { }
}