import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../models/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginModel = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: () => {
          this.authService.setLoggedIn(true);
          this.router.navigate(['/home']);
        },
        error: () => alert('Login falhou, verifique suas credenciais')
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
