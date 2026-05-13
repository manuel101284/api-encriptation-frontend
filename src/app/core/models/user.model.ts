export interface User {
  id?: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  dni: string;
  password: string;
}

export interface UserResponse {
  id: string; // - Asegurar que existe
  name: string;
  phone: string;
  email: string;
  age: number;
  dni: string;
}