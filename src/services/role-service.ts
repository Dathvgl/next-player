import { roleApi } from "~/redux/apis/role-api";

// Role
export const useGetRoles = roleApi.useGetRolesQuery;
export const usePostRole = roleApi.usePostRoleMutation;
export const usePutRole = roleApi.usePutRoleMutation;
export const useDeleteRole = roleApi.useDeleteRoleMutation;

// Role type
export const useGetRoleTypes = roleApi.useGetRoleTypesQuery;
export const usePostRoleType = roleApi.usePostRoleTypeMutation;
export const usePutRoleType = roleApi.usePutRoleTypeMutation;
export const useDeleteRoleType = roleApi.useDeleteRoleTypeMutation;
