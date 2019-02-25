/**
 * Created by Sudarshana on 1/09/19.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  constructor(private toastr: ToastrService) {}

  transform(value: any, args?: any): any {

    let pipeResults: any;
    
    if (!value || !args) {
      pipeResults = value;
    } else {
      pipeResults = value.filter(item => item.appName.toLocaleLowerCase().indexOf(args.appName) !== -1);
    }
    return pipeResults;
  }
}
