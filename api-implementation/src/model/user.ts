export interface User {
  name: string;
  sub: string
  groups: string[];
  scopes: string;
  roles: string[];
  jwt: any;
}