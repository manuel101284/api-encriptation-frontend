import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { UserResponse, User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserListComponent implements OnInit{
  users: UserResponse[] = [];
  loading = false;
  error = '';
  selectedUser: UserResponse | null = null;
  showEditForm = false; // Nueva variable para controlar el formulario de edición
  editPassword: string = ''; // Nueva variable para la contraseña de edición
  editUserData: UserResponse = {
    id: '',
    name: '',
    phone: '',
    email: '',
    age: 0,
    dni: ''
  }

  constructor(
    private readonly userService: UserService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    console.log('🟢 Iniciando carga de usuarios...');
    this.loading = true;

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos del servicio: ', data);
        console.log('📊 Cantidad de usuarios: ', data.length);
        this.users = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error al cargar usuarios: ', err);
        this.error = "Error al cargar usuarios";
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteUser(id: string): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          alert('Usuario eliminado correctamente');
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('❌ Error al eliminar usuario: ', err);
          alert('Error al eliminar usuario');
          this.cdr.detectChanges();
        }
      });
    }
  }

  editUser(user: UserResponse): void {
    console.log('✏️ Editando usuario:', user);
    // Asegurar que el id se copia correctamente
    this.editUserData = {
      id: user.id,           // ← Asegurar que el id se asigna
      name: user.name,
      phone: user.phone,
      email: user.email,
      age: user.age,
      dni: user.dni
    };
    console.log('📝 Datos copiados:', this.editUserData);
    this.showEditForm = true;
    this.selectedUser = null;
    this.cdr.detectChanges();
  }

  saveEdit(): void {
    console.log('🔵 saveEdit llamado');
    console.log('editUserData:', this.editUserData);

    if (!this.editUserData.id || this.editUserData.id === '') {
      console.error('❌ No hay ID de usuario');
      alert('Error: No se pudo identificar el usuario');
      return;
    }

    const userToUpdate = {
      name: this.editUserData.name,
      phone: this.editUserData.phone,
      email: this.editUserData.email,
      age: this.editUserData.age,
      dni: this.editUserData.dni,
      password: 'Test123#'  // Contraseña temporal
    };

    console.log('📤 Enviando PUT a ID:', this.editUserData.id);
    console.log('📦 Datos:', userToUpdate);

    this.userService.updateUser(this.editUserData.id, userToUpdate).subscribe({
      next: (response) => {
        console.log('✅ Respuesta:', response);
        this.loadUsers();
        this.closeEditForm();
        alert('Usuario actualizado correctamente');
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Error al actualizar usuario');
      }
    });
  }

  closeEditForm(): void {
    console.log('🔵 Cerrando formulario de edición');
    this.showEditForm = false;
    this.editUserData = {
      id: '',
      name: '',
      phone: '',
      email: '',
      age: 0,
      dni: ''
    };
  }

  viewUserDetails(user: UserResponse): void {
    console.log('👁️ Ver detalles de: ', user.name);
    this.selectedUser = user;
    // Forzar detección de cambios
    this.cdr.detectChanges();
  }

  closeModal(): void {
    this.selectedUser = null;
  }
}
