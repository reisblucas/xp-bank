export interface IUserSignUp {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  rg: string;
  cpf: string;
  gender?: number;
  postal_code: string;
  logradouro: string;
  complement: string;
  number: number;
  district: string;
  city: string;
  state: string;
  state_code: string;
}

export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IDeposit {
  userId: number;
  quantity: number;
}
