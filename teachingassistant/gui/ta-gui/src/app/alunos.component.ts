import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
   constructor(private alunoService: AlunoService) {}

   aluno: Aluno = new Aluno();
   alunos: Aluno[];
   cpfLoginduplicado: boolean = false;

   criarAluno(a: Aluno): void {
     this.alunoService.criar(a)
        .then(ab => {
           if (ab) {
              this.alunos.push(ab);
              this.aluno = new Aluno();
           } else {
              this.cpfLoginduplicado = true;
           }
        })
        .catch(erro => alert(erro));
   }

   removerAluno(a:Aluno):void{
      this.alunoService.remover(a)
      .then(a=>{
         if(a){
            this.alunos = this.alunos.filter(b=>b.cpf != a.cpf);
            this.aluno = new Aluno();
         }
      })
      .catch(erro => alert(erro));
   }


   onMove(): void {
      this.cpfLoginduplicado = false;
   }

   ngOnInit(): void {
     this.alunoService.getAlunos()
         .then(as => this.alunos = as)
         .catch(erro => alert(erro));
   }

}
