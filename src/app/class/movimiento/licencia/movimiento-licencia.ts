import { SubServiciosLicencia } from './sub-servicios-licencia';

export class MovimientoLicencia {
  idAgente: number;
  SubServicios: SubServiciosLicencia[];
  Organizacion: number;
  Fecha1: string;
  Fecha2: string;
  FechaTermino: string;
  Licencia: number;
  CantidadHoras: number;
  Observaciones: string;
  NroCertificado: number;
  SubOrganizacionReal: number;
  FechaPresentacion: string;
  Enfermedad: number;
  Borrar: string;
  Confirmada: string;
  HorasDePlaza: string;
  FechaDeLicencia: number;
  IdUsuarioWeb: number;

  constructor() {
    this.SubServicios = [];
  }
}
