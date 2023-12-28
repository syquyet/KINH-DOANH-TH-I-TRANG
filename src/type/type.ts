export interface IUser {
  name: string;
  email: string;
  phone: string;
  password:string;
  repeatPassword: string;
}
export interface I_Routes {
  titles: string;
  path: string;
  element: any;
}