import users from '@/data/users.json';
import { generateToken, decodeToken } from './jwt';

export interface User {
  id: string;
  role: 'admin' | 'vendor' | 'customer';
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  vendorId?: string;
  token: string | null;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: Omit<User, 'password'>;
  token?: string;
}

export function loginUser(email: string, password: string): AuthResponse {
  const user = users.find(u => u.email === email && u.password === password) as User | undefined;

  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  const token = generateToken(user.id, user.role);
  const { password: _, ...userWithoutPassword } = user;

  return {
    success: true,
    user: { ...userWithoutPassword, token },
    token,
  };
}

export function signupUser(data: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}): AuthResponse {
  const existingUser = users.find(u => u.email === data.email) as User | undefined;

  if (existingUser) {
    return {
      success: false,
      message: 'Email already exists',
    };
  }

  const newUser: User = {
    id: `u${users.length + 1}`,
    role: 'customer',
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    address: data.address,
    token: null,
  };

  const token = generateToken(newUser.id, newUser.role);
  const { password: _, ...userWithoutPassword } = newUser;

  return {
    success: true,
    user: { ...userWithoutPassword, token },
    token,
  };
}

export function getCurrentUser(token: string): Omit<User, 'password'> | null {
  const payload = decodeToken(token);
  if (!payload) return null;

  const user = users.find(u => u.id === payload.userId) as User | undefined;
  if (!user) return null;

  const { password: _, ...userWithoutPassword } = user;
  return { ...userWithoutPassword, token };
}

export function isAdmin(role: string): boolean {
  return role === 'admin';
}

export function isVendor(role: string): boolean {
  return role === 'vendor';
}

export function isCustomer(role: string): boolean {
  return role === 'customer';
}
