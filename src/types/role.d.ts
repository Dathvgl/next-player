export type Role = {
  _id: string;
  name: string;
  type: RoleType;
};

export type RoleType = {
  _id: string;
  name: string;
};

export type RolePost = Omit<Role, "_id" | "type"> & { type: string };
export type RoleTypePost = Omit<RoleType, "_id">;
