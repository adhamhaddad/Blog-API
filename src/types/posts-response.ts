export type PostResponseType = {
  id: string;
  title: string;
  content: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
};
