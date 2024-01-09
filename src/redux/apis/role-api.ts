import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Role, RolePost, RoleType, RoleTypePost } from "~/types/role";
import { prepareHeadersCustom } from "../base";
import { FetchList } from "~/types/type";

export const roleApi = createApi({
  reducerPath: "roleApi",
  tagTypes: ["Roles", "RoleTypes"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_EXTERNAL_API_CRAWL}/api`,
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    // Role
    getRoles: builder.query<FetchList<Role>, void>({
      query: () => "/role",
      providesTags: (result) => {
        if (!result) {
          return [{ type: "Roles" as const, id: "LIST" }];
        }

        return [
          { type: "Roles" as const, id: "LIST" },
          ...result.data.map(({ _id }) => ({
            type: "Roles" as const,
            id: _id,
          })),
        ];
      },
    }),
    postRole: builder.mutation<string, RolePost>({
      query: (arg) => ({ url: "/role", method: "POST", body: arg }),
      invalidatesTags: () => [{ type: "Roles", id: "LIST" }],
    }),
    putRole: builder.mutation<string, { id: string; data: RolePost }>({
      query: (arg) => ({
        url: `/role/${arg.id}`,
        method: "PUT",
        body: arg.data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Roles", id },
        { type: "Roles", id: "LIST" },
      ],
    }),
    deleteRole: builder.mutation<string, string>({
      query: (arg) => ({ url: `/role/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Roles", id }],
    }),

    // Role type
    getRoleTypes: builder.query<FetchList<RoleType>, void>({
      query: () => "/role/type",
      providesTags: (result) => {
        if (!result) {
          return [{ type: "RoleTypes" as const, id: "LIST" }];
        }

        return [
          { type: "RoleTypes" as const, id: "LIST" },
          ...result.data.map(({ _id }) => ({
            type: "RoleTypes" as const,
            id: _id,
          })),
        ];
      },
    }),
    postRoleType: builder.mutation<string, RoleTypePost>({
      query: (arg) => ({ url: "/role/type", method: "POST", body: arg }),
      invalidatesTags: () => [{ type: "RoleTypes", id: "LIST" }],
    }),
    putRoleType: builder.mutation<string, { id: string; data: RoleTypePost }>({
      query: (arg) => ({
        url: `/role/type/${arg.id}`,
        method: "PUT",
        body: arg.data,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "RoleTypes", id },
        { type: "RoleTypes", id: "LIST" },
      ],
    }),
    deleteRoleType: builder.mutation<string, string>({
      query: (arg) => ({ url: `/role/type/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "RoleTypes", id },
        { type: "Roles", id: "LIST" },
      ],
    }),
  }),
});
