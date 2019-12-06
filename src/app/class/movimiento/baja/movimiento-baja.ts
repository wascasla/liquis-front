import { SubServiciosLicencia } from '../licencia/sub-servicios-licencia';

export class MovimientoBaja {
    idAgente: number;
    Organizacion: number;
    Fecha2: string;
    CausaBaja: number;
    FechaProbableParto: string;
    IsAccidenteTrabajo: boolean;
    Observaciones: string;
    Servicios: SubServiciosLicencia[];
    IsDeshacerBaja: boolean;
    IdUsuarioWeb: number;

    constructor() {
        this.Servicios = [];
      }
}
