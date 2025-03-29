import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string): any[] {
    if (!filterString) {
      return value;
    }

    const filterValue = filterString.toLowerCase();

    return value.filter((item) => {
      return item.name.toLowerCase().includes(filterValue);
    });
  }
}
