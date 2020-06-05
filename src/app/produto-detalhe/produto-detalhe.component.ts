import { Component, OnInit, OnChanges } from '@angular/core';
//import { Produto } from '../produtos/produto';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Location} from '@angular/common';
//import { ProdutoService } from '../produtos/produto.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit{


  produtoId: number;
  //produto:Observable<Produto>;
  //produt:Produto;


  constructor(private route: ActivatedRoute, 
   // private produtoService: ProdutoService, 
    private location:Location,
    private router:Router
    ) { 

      
    }




  ngOnInit(): void {
    // this.produtoId = this.route.snapshot.params.id
    // this.produto = this.produtoService.pegaProdutoId(this.produtoId)
    // this.produto.subscribe(()=>{
    
    //   console.log('Estou sendo chamado a cada clique')
    // })
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    // this.produtoService.pegaProdutoId(this.produtoId)
    //   .subscribe(x => this.produt = x);
  }

}
