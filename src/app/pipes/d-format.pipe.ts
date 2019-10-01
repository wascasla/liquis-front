import { Pipe, PipeTransform, KeyValueDiffers } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dFormat'
})
export class DFormatPipe implements PipeTransform {

  transform(value: string): any {
    // tslint:disable-next-line:no-debugger
    if (value.length > 0) {
      return moment(value, 'DD/MM/YYYY hh:mm:ss').format('DD/MM/YYYY');
    }
    return value;
  }

}
