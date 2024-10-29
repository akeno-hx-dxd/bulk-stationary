"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";
import { Group } from "@/lib/types"; // Importing the types
import CsImage from "@/components/CsImage"; // Import CsImage

export default function ProductNavigationMenu() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch("/api/groups");
      if (res.ok) {
        const parsedRes = await res.json();
        setGroups(parsedRes.groups);

        // Collect unique brands
        let brandsCollection: string[] = [];
        parsedRes.groups.forEach((group: Group) => {
          group.groupProducts.forEach(({ product }) => {
            brandsCollection.push(product.brand);
          });
        });

        // Use Set to remove duplicates, then set brands
        setBrands(Array.from(new Set(brandsCollection)));
      } else {
        console.error("Failed to fetch groups");
      }
    };
    fetchGroups();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {groups.map((group) => (
          <NavigationMenuItem key={group.id}>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
              {group.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {group.name === "Shop by Brands" ? (
                <ul className="grid grid-cols-6 w-[600px] gap-1 p-2">
                  {brands.map((brand) => (
                    <ListItem
                      key={brand}
                      title={brand}
                      href={`/brand/${brand}`}
                      className="text-sm p-1 hover:underline hover:underline-offset-2 font-sans"
                    >
                      {brand}
                    </ListItem>
                  ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-5 w-[1150px] gap-2 p-2">
                  {group.groupProducts.map(({ product }) => (
                    <ListItem
                      key={product.id}
                      title={product.name}
                      href={`/product/${product.id}`}
                      className="col-span-1 p-1 "
                    >
                      <div className="flex items-center gap-2">
                        <CsImage
                          src={product.image_uris[0]}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="rounded-md"
                        />
                        <div className="grid grid-rows-2">
                          <div className="text-sm font-medium leading-none tracking-tighter text-xs hover:underline hover:underline-offset-2">
                            {product.name}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(product.pricing[0].price)}
                          </p>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </ul>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
