import { User } from "./User";

export class Curso {
    id?: number | undefined;
    nombre?: string | undefined;
    descripcion?: string | undefined;
    programa?: string | undefined;
    docenteId?: string | undefined;
    docente?: User | undefined;

    constructor() {}
}