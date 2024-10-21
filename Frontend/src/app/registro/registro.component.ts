import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  registroForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      idRol: ['', Validators.required]  // Asegúrate de definir cómo se selecciona el rol en el frontend
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registroForm.invalid) {
      return;
    }

    this.http.post('http://localhost:3000/usuario/registrar', this.registroForm.value)
      .subscribe(response => {
        console.log('Usuario registrado con éxito', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('Error al registrar usuario', error);
      });
  }
}
