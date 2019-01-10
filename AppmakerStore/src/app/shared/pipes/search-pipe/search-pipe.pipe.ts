/**
 * Created by Sudarshana on 1/09/19.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.appName.toLocaleLowerCase().indexOf(args.appName) !== -1);
  }

}
