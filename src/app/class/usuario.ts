export class Usuario {
  idUsuario: number;
  roles: any[];
  Agente: number;
  Nombre: string;
  Modo: string;
  reparticion: any[];
  esJefe: string;
  Usuario: string;
  password: string;
  email: string;
  Estado: string;
  Diagnostico: boolean;

  constructor() {
    this.Agente = -1;
    this.roles = [];
    this.reparticion = [];
    this.esJefe = 'N';
  }
}
