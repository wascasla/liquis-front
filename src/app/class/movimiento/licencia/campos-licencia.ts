import { Parser } from 'src/app/util/parser';

export class CamposLicencia {
    // campos de busqueda
    IdAgente: number;
    Documento: number;
    CUISE: number;
    Nombres: string;
    Fecha: string;

    // campos de edicion
    FechaInicio: string;
    FechaPresentacion: string;
    isFechaFin: boolean;
    FechaFin: string;
    FechaTermino: string;
    Licencia: number;
    CantidadHoras: number;
    Enfermedad: number;
    NroCertificado: number;
    Observaciones: string;
    isBorrar: boolean;

    constructor() {
        this.isFechaFin = false;
        this.isBorrar = false;
    }

    getFormatFecha(): string {
        return Parser.parseDateFormat(this.Fecha);
    }
}