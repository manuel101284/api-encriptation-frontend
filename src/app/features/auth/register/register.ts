import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      dni: ['', [Validators.required]],
      // ✅ Correcto: solo un array de validadores síncronos
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$%/_\-]).*$/)
      ]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage = `Usuario ${response.name} registrado exitosamente.`;
        this.registerForm.reset();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al registrar el usuario';
      }
    });
  }
}
