import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', pathMatch: 'full' , redirectTo: 'produtos'},
  { 
    path: 'produtos',
    loadChildren: './produtos/produtos.module#ProdutosModule' 
  }
  //{ path: 'produtoDetalhe/:id', component:  ProdutoDetalheComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
