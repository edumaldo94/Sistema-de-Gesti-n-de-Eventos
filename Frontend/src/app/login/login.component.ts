import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.http.post('http://localhost:3000/usuario/login', this.loginForm.value)
      .subscribe((response: any) => {
        console.log('Inicio de sesión exitoso', response);
        localStorage.setItem('token', response.token); // Guardar el token en localStorage
        this.router.navigate(['/dashboard']); // Redirigir después del login
      }, error => {
        console.error('Error en el login', error);
      });
  }
}
