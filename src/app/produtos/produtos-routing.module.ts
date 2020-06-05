import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosListaComponent } from './produtos-lista/produtos-lista.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutoResolverGuard } from './guards/produto-resolver.guard';


const routes: Routes = [
  {path: '', component: ProdutosListaComponent},
  {path: 'novo', component: ProdutosFormComponent,
    resolve: {
      produto: ProdutoResolverGuard
    }
  },
  {path: 'editar/:id', component: ProdutosFormComponent, resolve: { produto: ProdutoResolverGuard }}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
