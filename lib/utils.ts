import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { QueryParams } from "@/types";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addUrlQuery({ params, key, value }: QueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value!;

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true },
  );
}

export function removeUrlQuery({ params, key }: QueryParams) {
  const currentUrl = qs.parse(params);

  delete currentUrl[key];

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true },
  );
}
