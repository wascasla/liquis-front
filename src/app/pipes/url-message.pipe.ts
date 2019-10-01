import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlMessage'
})
export class UrlMessagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let resultado = '';
    let desde = 0;
    let hasta = 0;
    if (value.includes('<span>')) {
      desde = value.indexOf('<span>') + String('<span>').length;
      hasta = value.indexOf('</span>');
      resultado = value.substr(desde, (hasta - desde));
      resultado = resultado.replace('<Strong>', '');
      // tslint:disable-next-line:quotemark
      resultado = resultado.replace("<Strong style='text-transform: uppercase;'>", '');
      // tslint:disable-next-line:quotemark
      resultado = resultado.replace("<Strong class='circle green' style='padding: 3px;'>", '');
      resultado = resultado.replace('</Strong>', '');
    }
    return resultado;
  }

}
