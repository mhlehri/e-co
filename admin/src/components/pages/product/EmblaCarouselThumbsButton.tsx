import { Button } from "@/components/ui/button";
import Image from "next/image";
import type React from "react";

type PropType = {
  selected: boolean;
  img: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, img, onClick } = props;

  return (
    <Button
      onClick={onClick}
      variant="link"
      className={`${
        selected ? "" : "opacity-70 hover:opacity-100"
      } size-20 shrink-0 overflow-hidden rounded-lg bg-transparent p-0`}
    >
      <Image
        src={img}
        className="bg-primary-300 h-full w-full object-cover"
        width={150}
        height={150}
        alt="Thumb"
      />
    </Button>
  );
};
