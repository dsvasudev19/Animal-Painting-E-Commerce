import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlePipe'
})
export class TitlePipePipe implements PipeTransform {

  transform(title: string): string {
    return title.toUpperCase();
  }

}
