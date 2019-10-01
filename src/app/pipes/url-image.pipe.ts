import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlImage'
})
export class UrlImagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let resultado = '';
    let desde = 0;
    let hasta = 0;
    if (value.includes('<img src=')) {
        desde = value.indexOf('<img src=') + 1;
        hasta = value.indexOf('.png') + String('.png').length ;
        resultado = value.substr(desde, (hasta - desde));
        desde = resultado.lastIndexOf('/') + 1;
        resultado = resultado.substr(desde, resultado.length);
    }
    return resultado;
  }

}
