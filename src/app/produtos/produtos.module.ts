import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { SearchComponent } from './search/search.component';
import { FilterByDescription } from './filter-by-description.pipe';


@NgModule({
  declarations: [ProdutosListaComponent, ProdutosFormComponent, SearchComponent, FilterByDescription],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProdutosModule { }
