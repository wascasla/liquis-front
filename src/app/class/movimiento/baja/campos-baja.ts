import { Parser } from 'src/app/util/parser';

export class CamposBaja {
    // campos de busqueda
    IdAgente: number;
    Documento: number;
    CUISE: number;
    Nombres: string;
    Sexo: string;

    // campos de edicion
    FechaBaja: string;
    IsProteccionMaternidad: boolean;
    IsAccidenteTrabajo: boolean;
    FechaProbableParto: string;
    CausaBaja: number;
    Observaciones: string;
    IsDeshacerBaja: boolean;

    constructor() {
    }

    getFormatFechaBaja(): string {
        return Parser.parseDateFormat(this.FechaBaja);
    }
}