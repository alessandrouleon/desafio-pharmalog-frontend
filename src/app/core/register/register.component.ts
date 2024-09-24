import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;

  formFields = [
    { label: 'Usuário', controlName: 'usuario', error: 'Usuário é obrigatório.' },
    { label: 'Nome', controlName: 'nome', error: 'Nome é obrigatório.' },
    { label: 'Endereço', controlName: 'endereco', error: 'Endereço é obrigatório.' },
    { label: 'Contato', controlName: 'contato', error: 'Contato é obrigatório.' },
    { label: 'Cidade', controlName: 'cidade', error: 'Cidade é obrigatória.' },
    { label: 'UF', controlName: 'estado', error: 'UF é obrigatório.' },
    { label: 'CRECI', controlName: 'creci', error: 'CRECI é obrigatório.' },
    { label: 'Senha', controlName: 'senha', error: 'A senha deve ter entre 5 e 10 caracteres, incluindo letra maiúscula, minúscula e caractere especial.', isPassword: true }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      endereco: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      contato: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      cidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      estado: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
      creci: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
      senha: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.senhaValidator]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: () => alert('Falha no cadastro, tente novamente.')
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
    console.log('Senha visível:', this.hide);
  }

  private senhaValidator(control: AbstractControl): { [key: string]: any } | null {
    const valor = control.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}$/; // mínimo 5, máximo 10, com letras maiúsculas, minúsculas e caractere especial
    return regex.test(valor) ? null : { senhaInvalida: true };
  }
}
