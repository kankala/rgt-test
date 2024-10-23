import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputpattern'
})
export class InputpatternPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
