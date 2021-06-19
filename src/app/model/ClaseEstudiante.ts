import { User } from "./User";

export class ClaseEstudiante {
    id?: number | undefined;
    clasesId?: number | undefined;
    clases?: string | undefined;
    estudiantesId?: number | undefined;
    estudiante?: User | undefined;
    asiste?: boolean | undefined;

    constructor() {}
}