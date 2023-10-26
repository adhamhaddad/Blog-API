export type PostType = {
  id: number;
  uuid: string;
  title: string;
  content: string;
  createdBy: string;
  created_at?: Date;
  updated_at?: Date;
};
