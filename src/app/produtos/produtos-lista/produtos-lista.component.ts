import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto';
import { Observable, empty, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { BsModalRef} from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css']
})
export class ProdutosListaComponent implements OnInit {


  produtos: Produto[];

  produtos$: Observable <Produto[]>;
  error$ = new Subject<boolean>();

  produtoSelecionado: Produto;

 // bsModalRef: BsModalRef;
 deletModalRef: BsModalRef;
 @ViewChild('deleteModal') deleteModal;

  constructor(
    private service: ProdutoService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    //posso fazer dessa maneira
    // this.service.listaProdutos()
    //     .subscribe(dados => this.produtos = dados)

    //fazendo da maneira abaixo eu evito de fazer da maneira de cima
    //chamo o metodo de refresh
    this.onRefresh();





  }

  onRefresh(){

    this.produtos$ = this.service.listaProdutos()
    .pipe(
      catchError(error=>{
        console.log(error);
        this.handleError();
        return empty();
      })
    )

  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar Produtos. tente mais tarde!');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar Produtos. tente mais tarde';
  }

  onEdit(id){
    this.router.navigate(['editar', id], { relativeTo: this.route});
  }

  onDelete(produto){
    this.produtoSelecionado = produto;
    //Modal antiga
    //this.deletModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    //
    const resultado$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que Deseja Remover o Produto?', 'SI', 'NO');
    resultado$.asObservable()
      .pipe(
        take(1),
        switchMap( result => result ? this.service.remove(produto.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao Remover Produto. tente mais tarde!');
        }
      );
  }

  onConfirmDelete(){
    this.service.remove(this.produtoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh();
        this.deletModalRef.hide();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao Remover Produto. tente mais tarde!');
        this.deletModalRef.hide();
      }
    );
  }

  onDeclineDelete(){
    this.deletModalRef.hide();
  }

}
