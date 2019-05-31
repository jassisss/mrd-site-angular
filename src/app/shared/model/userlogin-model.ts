export interface UserloginModel {
  id: number;
  name: string;
  email: string;
  date_create: Date;
  date_update: Date;
  user_type_id: number;
  typeName: string;
  user_status_id: number;
  statusName: string;
  photo: string;
  token: string;
}
