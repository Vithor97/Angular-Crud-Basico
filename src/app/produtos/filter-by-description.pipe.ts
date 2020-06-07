import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from './produto';



@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {

    transform(produtos: Produto[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if (descriptionQuery) {
            // tslint:disable-next-line: no-shadowed-variable
            return produtos.filter(produtos =>
              produtos.nome.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return produtos;
        }
    }

}
