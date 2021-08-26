import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const urlBase='http://localhost:3000';

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
  produtos: Produto[] = [];
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    preco: new FormControl(0, [Validators.required, Validators.min(1)])
  })

  constructor(private HttpClient: HttpClient){

  }
  ngOnInit(): void {
    this.HttpClient.get<Produto[]>(`${urlBase}/produtos`).subscribe(dados => {
      console.log(dados);
      this.produtos = dados;
    })
  }
}
