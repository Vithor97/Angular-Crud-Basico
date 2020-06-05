import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produto';
import { map, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  numeroRegx = '^[0-9]*$';
  numeroDecimais = '^-?[0-9]\\d*(\\.\\d{1,4})?$';

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private alertModal: AlertModalService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log('oid ' + id);
    //     const produto$ = this.produtoService.pegaProdutoId(id)
    //     produto$.subscribe( produto => {
    //       this.atualizaForm(produto);
    //     });
    //   }
    // );

    // let vall = null;
    // this.route.params.subscribe(params => vall  = params.id);

    // if( vall !== undefined){



    // this.route.params
    // .pipe(
    //   map((params: any) => params['id']),
    //   switchMap(id =>  this.produtoService.pegaProdutoId(id)),
    //   tap(()=> console.log('entrei no metodo viad'))
    // )
    // .subscribe((curso) => {
    //     this.atualizaForm(curso);
    //   }
    // );

    // }

    // Metod utilizando resolver para pegar os dados dos produto e atribuit no form
    // Se for Criação ele deixa tudo como null, senão vai atribuir os valores conforme o parametro recebido na ULR
    const produto = this.route.snapshot.data.produto;

    this.form = this.fb.group({
      id: [produto.id],
      nome: [produto.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      quantidade: [produto.quantidade, [Validators.required, Validators.pattern(this.numeroRegx)]],
      valor: [produto.valor, [Validators.required, Validators.pattern(this.numeroDecimais)]]
    });
  }

  // atualizaForm(produto: Produto){
  //   this.form.patchValue({
  //     id: produto.id,
  //     nome: produto.nome,
  //     quantidade: produto.quantidade,
  //     valor: produto.valor
  //   });
  // }

  hasError(field: string){
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid){

      // Form mais suscinta
        let mensErro = 'Erro ao cadastrar novo produto';
        let mensSucesso = 'Produto Criado Com sucesso';
        if ( this.form.value.id ){
          mensErro = 'Produto Atualizado Com sucesso',
          mensSucesso = 'Produto Atualizado Com sucessooo';
        }

        this.produtoService.salva(this.form.value).subscribe(
          success => {
            this.alertModal.showAlertSucces(mensSucesso);
            this.submitted = false;
            this.form.reset();
            this.location.back();
          },
          error => {
            this.alertModal.showAlertDanger(mensErro);
          }
        );

      //


      //-------FORMA MAIS VERBOSA------//
      // Validar se existe um ID(Edita), caso não, então é uma criação
      //   if ( this.form.value.id){
      //   // Atualiza
      //   this.produtoService.atualizaProduto(this.form.value).subscribe(
      //     success => {
      //       this.alertModal.showAlertSucces('Produto Atualizado Com sucesso');
      //       this.submitted = false;
      //       this.form.reset();
      //     },
      //     error => {
      //       this.alertModal.showAlertDanger('Produto não alterado');
      //     }
      //   );
      // }
      // else{

      //   this.produtoService.criarProduto(this.form.value).subscribe(
      //     success => {
      //       this.alertModal.showAlertSucces('Produto Criado Com sucesso');
      //       this.submitted = false;
      //       this.form.reset();
      //     },
      //     error => {
      //       this.alertModal.showAlertDanger('Erro ao cadastrar novo produto');
      //     }
      //   );

      // }

    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();

  }

}
