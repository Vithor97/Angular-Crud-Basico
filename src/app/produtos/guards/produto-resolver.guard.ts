import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoResolverGuard implements Resolve<Produto> {

  constructor(
    private produtoService: ProdutoService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Produto> {

    if(route.params && route.params['id']){
      return this.produtoService.pegaProdutoId(route.params['id']);
    }
    else{
      return of({
        id: null,
        nome: null,
        quantidade: null,
        valor: null
      });
    }
  }


}
