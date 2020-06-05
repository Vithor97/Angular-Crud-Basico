import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Produto } from './produto';
import { delay, tap, take } from 'rxjs/operators';


const API = 'http://localhost:8080/api';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    constructor(private http: HttpClient){}

    listaProdutos(){
        return this.http.get<Produto[]>(API + '/produtos')
        .pipe(
            delay(2000),
            tap(() => { console.log('oi') })
        );
    }

    pegaProdutoId(produtoId: number){
        return this.http.get<Produto>(API + '/produtos/' + produtoId).pipe(take(1));
    }

    criarProduto(produto){
      return this.http.post(API + '/produto', produto).pipe(take(1));
    }

    atualizaProduto(produto){
      return this.http.put(`${API}/produto/${produto.id}`, produto).pipe(take(1));
    }

    salva(produto){
      if (produto.id){
        return this.atualizaProduto(produto);
      }
      else{
        return this.criarProduto(produto);
      }
    }

    remove(id){
      return this.http.delete(API + '/produto/' + id).pipe(take(1));
    }
}
