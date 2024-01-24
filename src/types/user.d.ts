export type User = {
  _id: string;
  uid: string;
  name?: string;
  email?: string;
  thumnail?: string;
  gender?: string;
  birth?: number;
  roles: Pick<RoleMongo, "_id" | "name">[];
};

export type UserPost = Omit<User, "_id" | "uid" | "roles">;
