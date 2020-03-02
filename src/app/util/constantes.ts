export abstract class Constantes {
    // Produccion
    //static URL_MAIN = '/SageNetApiDefault/api';
    // Local
    static URL_MAIN = 'http://rrhh.catamarca.edu.ar/SageNetApiDefault/api';
    public static readonly LOGIN_USER = 'sage_user';
    public static readonly LOGIN_TOKEN = 'sage_token';

    // Mensaje chequeo exitoso
    // tslint:disable-next-line:max-line-length
    public static readonly MESSAGE_CHEQUEO_EXITO = '<Strong>No se ha producido ningun error </Strong>durante la verificación. Ejecute ahora la operación presionando el botón <Strong>Ejecutar</Strong>.';
    // Mensaje ejecución exitoso
    // tslint:disable-next-line:max-line-length
    public static readonly MESSAGE_EJECUCION_EXITO = 'La Ejecucion fue realizada <Strong>éxitosamente</Strong>, presione el botón <Strong>Nuevo</Strong> para realizar otro movimiento.';

    public static readonly SI = 'S';
    public static readonly NO = 'N';

    public static readonly ACTIVO = true;
    public static readonly INACTIVO = false;

    public static readonly PARO = 126;
    public static readonly INJUSTIFICADA = 92;
    public static readonly SR_SUPLENTE = '4';

    public static readonly KEY_ENTER = 13;
}
