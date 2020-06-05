import { Component, OnInit } from '@angular/core';

//import { Produto } from './produtos/produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'project';

  //produtos: Produto [];

  constructor(){}

  ngOnInit(): void {
    // console.log("entrou")
    // this.produtoService.listaProdutos().subscribe( x =>{
    //   console.log(x);
    //   this.produtos = x
    // })
  }

}
