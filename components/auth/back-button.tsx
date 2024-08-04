"use client";

import Link from "next/link";
import { Button } from "../ui/button";



interface BackButtonProps {
  href: string;
  label: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button variant="link" size="sm" className="w-full font-normal" asChild>
      <Link href={href} className="text-sm text-muted-foreground">
        {label}
      </Link>
    </Button>
  );
}