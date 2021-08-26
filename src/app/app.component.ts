import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//URL DA COMUNICAÇÃO COM O BACKEND
const urlBase='http://localhost:3000';

//Definindo a interface
interface Produto{
  id: number;
  nome: string;
  preco:number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //Metodo GET retorna um array de produtos
  produtos: Produto[] = [];
  //Declarando o formulário que temos controle
  form = new FormGroup({
    nome: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  //CRIAR UM CONSTRUTOR E DECLARAR UM PARAMETRO HTTPCLIENT
  constructor(private HttpClient: HttpClient){
  }

  ngOnInit(): void {
    //NECESSIDADE DE FAZER A COMUNICAÇÃO NO INICIO, AO SER EXECUTADO O SISTEMA
    //objeto + [listar + local de captação/'listagem' (URL)] + callback dentro do subscribe
    this.HttpClient.get<Produto[]>(`${urlBase}/produtos`).subscribe(dados => {
      console.log(dados);
      this.produtos = dados;
    })
  }

  //FAZENDO A SEGUNDA REQUISIÇÃO HTTP
  adicionarProduto(){
    const produto = this.form.value; //pega todos os valores preenchidos no formulário
    //inserir dentro do backend
    this.HttpClient.post<Produto>(`${urlBase}/produtos`, produto)
      .subscribe(novoProduto => {
        this.produtos.push(novoProduto);
      })
  }

  excluir(produto: Produto){
      this.HttpClient.delete(`${urlBase}/produtos/${produto.id}`)
        .subscribe(()=>{
          const index = this.produtos.indexOf(produto);
        this.produtos.splice(index, 1);
      })
  }
}
