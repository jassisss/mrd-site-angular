export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  password_token: string;
  date_create: Date;
  date_update: Date;
  user_type_id: number;
  user_status_id: number;
  password_reset_token: string;
  password_reset_token_expired: Date;
}
