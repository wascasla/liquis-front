import { Parser } from 'src/app/util/parser';

export class CamposAlta {
    // campos de busqueda
    IdAgente: number;
    Documento: number;
    CUISE: number;
    Nombres: string;

    // campos de edicion
    FechaAlta: string;
    FechaBaja: string;
    FechaTermino: string;
    isFechaBaja: boolean;
    SituacionRevista: number;
    CausaAlta: number;
    CausaBaja: number;
    plazaSelect: any;
    Zona: number;
    Edificio: number;
    CargoSalarial: string;
    IdAgrupamiento: number;
    Horas: string;
    NivelEnsenanza: string;
    Modalidad: string;
    Observaciones: string;

    constructor() {
        this.isFechaBaja = false;
    }

    cargarCampos() {
        this.Horas = this.plazaSelect.Hora;
        this.Modalidad = this.plazaSelect.Modalidad;
        this.CargoSalarial = this.plazaSelect.Categoria;
        this.NivelEnsenanza = this.plazaSelect.Nivel;
    }

    limpiarCampos() {
        this.Horas = '';
        this.Modalidad = '';
        this.CargoSalarial = '';
        this.NivelEnsenanza = '';
        this.SituacionRevista = -1;
        this.CausaAlta = -1;
        this.CausaBaja = -1;
    }

    limpiarCamposOpcinales() {
        this.FechaBaja = '';
        this.CausaBaja = -1;
    }

    getFormatFechaBaja(): string {
        return Parser.parseDateFormat(this.FechaBaja);
    }

    getFormatFechaAlta(): string {
        return Parser.parseDateFormat(this.FechaAlta);
    }
}