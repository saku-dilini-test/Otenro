import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipePipe } from './search-pipe/search-pipe.pipe';


@NgModule({
  declarations: [ SearchPipePipe ],
  imports: [ CommonModule ],
  exports: [ SearchPipePipe ]
})

export class PipeModule {}
