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
 Settings, 
 ChevronDown, 
 Building2Icon, 
 ChevronUp, 
 BadgePlusIcon,
 ShoppingCartIcon,
 TrendingUp,
 Scissors,
 School,
 DrumIcon
} from "lucide-react"
import Link from "next/link"
import { Group } from "@/lib/types"
import {CatalogAndGroupEditButton} from "../admin/loggedIn"
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
            <DropdownMenu key={"brands"}>
                    <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Building2Icon />
                      Shop by Brand
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
              {groups.map((group) =>(
                  <Collapsible key={group.id} defaultOpen={true} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                        {
                          group.name === "Trending Products" || group.name === "Trending" ? (
                            <TrendingUp />
                          ) : group.name === "Best Selling Products" ? (
                            <DrumIcon />
                          ) : group.name === "Craft Products" || group.name === "Craft Supplies" || group.name === "Craft Essentials" ? (
                            <Scissors />
                          ) : group.name === "School Products" || group.name === "School Essentials" ? (
                            <School />
                          ) : (
                            <BadgePlusIcon />
                          )
                        }
                          <span>{group.name}</span>
                          <ChevronDown className="ml-auto" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.groupProducts.map(({ product }) => (
                            <SidebarMenuSubItem key={product.id}>
                              <Link href={`/product/view/${product.id}`} className="text-[10px] border-b">
                                {product.name}
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
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
                  <Settings/> Settings
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>
                    <Link href={"/login"}>
                      Admin Login
                    </Link>
                  </span>
                </DropdownMenuItem>
                <CatalogAndGroupEditButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
