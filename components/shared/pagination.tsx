"use client";

import { Button } from "@/components/ui/button";
import { addUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  isNext: boolean;
}

export default function Pagination({ page, isNext }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onNavigate = (direction: "prev" | "next") => {
    const nextPage = direction === "prev" ? page - 1 : page + 1;

    const newUrl = addUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPage.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className={"w-full flex items-center justify-center gap-x-4 mt-4"}>
      <Button
        size={"sm"}
        disabled={page === 1}
        onClick={() => onNavigate("prev")}
      >
        Previous
      </Button>
      <span>{page}</span>
      <Button size={"sm"} disabled={!isNext} onClick={() => onNavigate("next")}>
        Next
      </Button>
    </div>
  );
}
