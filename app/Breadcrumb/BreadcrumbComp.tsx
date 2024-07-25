"use client"
import Link from "next/link"
import React from "react"

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
        <BreadcrumbItem className=" text-primary " >
          <Link href="/">
            <RiHome5Fill />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathNames.map( (link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`;
          let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
          
          return (
            <React.Fragment key={index}>
              {pathNames.length !== index + 1 && (
                <>
                  <BreadcrumbItem key={`item-${index}`} className=" text-primary " >
                    <Link href={href}>{itemLink}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator key={`separator-${index}`} />
                </>
              )}
              {pathNames.length === index + 1 && (
                <BreadcrumbPage key={`page-${index}`} >{itemLink}</BreadcrumbPage>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
