import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/users';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.SERVER;

  constructor(private http: HttpClient) { }

  login(usuario: LoginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/users`, usuario);
  }

  register(user: UserModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  // Gerenciar estado de login
  setLoggedIn(loggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', loggedIn ? 'true' : 'false');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
  }
}
