import { Button } from "./ui/button";
import { ReactNode } from "react";

interface ApproveBtnProps {
  children: ReactNode;
}

export default function ApproveBtn({ children }: ApproveBtnProps) {
  return (
    <Button size="lg" className="bg-red-500" variant="positive">
      {children}
    </Button>
  );
}
