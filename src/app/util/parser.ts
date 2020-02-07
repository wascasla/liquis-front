import * as moment from 'moment';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material';

export class Parser {

    public static arrayDate(data): any {
        data.forEach(element => {
            if (element.FechaAlta) {
                element.FechaAlta = moment(element.FechaAlta, 'DD/MM/YYYY hh:mm:ss');
            }

            if (element.FechaBaja) {
                if (element.FechaBaja.length > 0) {
                    element.FechaBaja = moment(element.FechaBaja, 'DD/MM/YYYY hh:mm:ss');
                }
            }

            if (element.FechaCarga) {
                if (element.FechaCarga.length > 0) {
                    element.FechaCarga = moment(element.FechaCarga, 'DD/MM/YYYY hh:mm:ss');
                }
            }
        });
        return data;
    }

    public static parseDateFormat(date: string): string {
        return moment(date).format('YYYY-MM-DD');
    }


    public static parseToDate(date: string): Date {
        return moment(date).toDate();
    }

    public static parseToDateValid(date: string): boolean {
        return moment(date).isValid();
    }

    public static parseDayDiff(inicio: string, fin: string): number {
        return moment(fin).diff(moment(inicio), 'days', true) + 1;
    }

    public static isDateValidFormat(date: string): string {
        if (date.length !== 10) {
            return 'Formato incorrecto';
        } else {
            const da = date.split('/');
            if (da.length !== 3 || da[0].length !== 4 || da[1].length !== 2 || da[2].length !== 2) {
                return 'Formato incorrecto dd/mm/yyyy';
            } else if (moment(date).isValid()) {
                return 'Formato incorrecto';
            } else if (!moment(date).isValid()) {
                return 'Formato incorrecto';
            }
        }
        return 'Error desconocido.';
    }

    public static getParameterFormat(path: string, campo: string, value: string): string {
        if (path.indexOf('=') > 0) {
            if (value) {
                if (value.length > 0) {
                    return `&${campo}=${value}`;
                }
            }
        } else {
            if (value) {
                if (value.length > 0) {
                    return `?${campo}=${value}`;
                }
            }
        }
        return '';
    }

    public static parseStyleMessageAlert(message: string) {
        return `<p class="alert alert alert-warning">${message}</p>`;
    }

    public static parseStyleMessageError(message: string) {
        const cadena =  `<p class="alert alert-danger">${message}</p>`;
        // mensajes de error
        if (cadena.indexOf(message) !== -1) {
            return message;
        }
        return `<p class="alert alert-danger">${message}</p>`;
    }

    public static parseStyleMessageExito(message: string) {
        return `<p class="alert alert-success" style="padding-top: 23px; padding-bottom: 23px;">${message}</p>`;
    }

    public static parseStyleMessageInfo(message: string) {
        return `<p class="alert alert-info">${message}</p>`;
    }

    public static getMessageStyle(message: string, titulo: string): string {

        // encabezado
        const encabezado = `<h6 class="alert-heading">${titulo}</h6>`;

        // mensajes de alerta
        const messageAlert = 'class="alerta mensajes"';
        const bMessageAlert = 'class="alert alert-warning"';

        // mensajes de error
        const messageError = 'class="error mensajes"';
        const bMessageError = 'class="alert alert-danger"';

        // mensajes de info
        const messageInfo = 'class="info mensajes"';
        const bMessageInfo = 'class="alert alert-info"';

        // mensajes de info
        const messageExito = 'class="exito mensajes"';
        const bMessageExito = 'class="alert alert-success"';

        if (message.length > 0) {
            message = message.split(messageAlert).join(bMessageAlert);
            message = message.split(messageError).join(bMessageError);
            message = message.split(messageInfo).join(bMessageInfo);
            message = message.split(messageExito).join(bMessageExito);
        }
        message = encabezado.concat(message);
        console.log(message);
        return message;
    }
}
