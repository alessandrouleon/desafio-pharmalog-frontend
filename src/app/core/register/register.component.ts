import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  hide = true;

  formFields = [
    { label: 'Nome', controlName: 'nome', error: 'Nome é obrigatório.' },
    { label: 'Username', controlName: 'username', error: 'Nome de usuario obrigatorio.' },
    { label: 'Senha', controlName: 'password', error: 'Senhaé obrigatório.' },
    { label: 'email', controlName: 'email', error: 'Emailade é obrigatória.' },
    { label: 'Administrador', controlName: 'isAdmin', error: 'Administrador é obrigatório.' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      isAdmin: [true],
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
