"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Folder, CreditCard } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={toggleMenu}>
      <DropdownMenuTrigger asChild>
        <Button onClick={toggleMenu} className="mr-4 " variant="secondary">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
         <Link href="/dashboard" className="flex"> <Folder className="mr-2 h-4 w-4" />
          <span>Projects</span> </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
        <Link href="/payments" className="flex">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span></Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default HeaderMenu;
