import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
  standalone: true
})
export class TimesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): Array<unknown> {
    return (new Array(value)).fill(null);
  }

}
