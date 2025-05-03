"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useCallback } from "react";
import { addUrlQuery, removeUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onInputChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    let newUrlQuery = "";

    newUrlQuery = addUrlQuery({
      params: searchParams.toString(),
      key: "query",
      value: inputValue,
    });

    if (!inputValue) {
      newUrlQuery = removeUrlQuery({
        params: searchParams.toString(),
        key: "query",
      });
    }

    router.push(newUrlQuery);
  };

  const onSelectChangeUrl = (selectValue: string) => {
    const newUrlQuery = addUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: selectValue,
    });
    router.push(newUrlQuery);
  };

  const onDebounceChangeUrl = useCallback(debounce(onInputChangeUrl, 300), []);

  return (
    <div className="flex flex-col md:flex-row md:justify-end gap-2 max-md:w-full">
      <div className="flex flex-col md:flex-row gap-2 max-md:w-full">
        <div className={"flex items-center bg-secondary"}>
          <Input
            placeholder={"Search..."}
            className={"no-focus border-none min-w-64 h-10"}
            onChange={onDebounceChangeUrl}
          />
          <Search className={"mx-4 cursor-pointer text-muted-foreground"} />
        </div>
        <div>
          <Select
            defaultValue={"latest"}
            onValueChange={(selectValue) => onSelectChangeUrl(selectValue)}
          >
            <SelectTrigger className={"bg-secondary"}>
              <SelectValue
                placeholder={"Filter"}
                className={"text-muted-foreground"}
              />
            </SelectTrigger>
            <SelectContent className={"m-0"}>
              <SelectItem value={"latest"}>Latest</SelectItem>
              <SelectItem value={"most-starred"}>Most starred</SelectItem>
              <SelectItem value={"most-viewed"}>Most viewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
