export interface School {
  id: number;
  name: string;
  city: string;
  area: string;
  address: string;
  fees: string;
  bus: string;
  infrastructure: string;
  rating: string;
}

export interface SearchFilters {
  city: string;
  area: string;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  token: string;
}
