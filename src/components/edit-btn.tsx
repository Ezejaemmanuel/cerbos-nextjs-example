import { Button } from "./ui/button";
import { ReactNode } from "react";

interface EditBtnProps {
  children: ReactNode;
}

export default function EditBtn({ children }: EditBtnProps) {
  return (
    <Button className="bg-red-500" size="lg">
      {children}
    </Button>
  );
}
