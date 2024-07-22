"use client"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { RiHome5Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";

export const BreadcrumbComp = () => {
  const path = usePathname();
  const pathNames = path.split('/').filter( path => path );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
            <Link href="/">
              <RiHome5Fill />
            </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathNames.map( (link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemLink = link[0].toUpperCase() + link.slice(1, link.length)
          return(
          <>
            {pathNames.length !== index + 1 && <>
              <BreadcrumbItem>
                <Link href={href}>{itemLink}</Link>
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
            </>}
            {pathNames.length === index + 1 &&
              <BreadcrumbPage>{itemLink}</BreadcrumbPage>}
          </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
