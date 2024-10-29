"use client"
import React, { useState, useEffect } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import {
  Calendar, Home, Inbox, Search, Settings, ChevronDown, Building2Icon, User2, ChevronUp, HomeIcon, ShoppingCartIcon, ScrollTextIcon,
} from "lucide-react"
import Link from "next/link"
import { Group } from "@/lib/types"

export default function AppSidebar() {
  const [groups, setGroups] = useState<Group[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch("/api/groups")
      if (res.ok) {
        const parsedRes = await res.json()
        setGroups(parsedRes.groups)

        // Collect unique brands
        let brandsCollection: string[] = []
        parsedRes.groups.forEach((group: Group) => {
          group.groupProducts.forEach(({ product }) => {
            brandsCollection.push(product.brand)
          })
        })
        setBrands(Array.from(new Set(brandsCollection)))
      }
    }
    fetchGroups()
  }, [])

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Bucket
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <ScrollTextIcon /> Wish-List
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShoppingCartIcon /> Current-Cart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {groups.map((group) =>
                group.name === "Shop by Brands" ? (
                  <DropdownMenu key={group.id}>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <Building2Icon />
                        {group.name}
                        <ChevronDown className="ml-auto" />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[--radix-popper-anchor-width] grid grid-cols-3">
                      {brands.map((brand: string) => (
                        <DropdownMenuItem key={brand}>
                          <Link href={`/brand/${brand}`} className="text-[10px] border-b">
                            {brand}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Collapsible key={group.id} defaultOpen={true} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <HomeIcon />
                          <span>{group.name}</span>
                          <ChevronDown className="ml-auto" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.groupProducts.map(({ product }) => (
                            <SidebarMenuSubItem key={product.id}>
                              <Link href={`/product/${product.id}`} className="text-[10px] border-b">
                                {product.name}
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
