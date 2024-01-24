import { TypeParam } from "~/types/type";

type ParamProps<T> = {
  searchParams: TypeParam;
  name: string;
  base?: T;
};

export function numberParam({
  searchParams,
  name,
  base = 1,
}: ParamProps<number>) {
  return typeof searchParams[name] === "string"
    ? Number(searchParams[name])
    : base;
}

export function stringParam({
  searchParams,
  name,
  base = "empty",
}: ParamProps<string>) {
  const value = searchParams[name];
  if (typeof value == "string") {
    return value;
  } else return base;
}
