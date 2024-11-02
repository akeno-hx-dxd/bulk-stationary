"use client";

import * as React from "react";
import { Product } from "@/lib/types";
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
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch("/api/groups");
      if (res.ok) {
        const parsedRes = await res.json();
        setGroups(parsedRes.groups);
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
              <ul className="grid grid-cols-5 w-[1100px] gap-2 p-2">
                  {group.groupProducts.map(({ product }: { product: Product }) => (
                    <ListItem
                      key={product.id}
                      title={product.name}
                      href={`/product/view/${product.id}`}
                      className="flex justify-start items-center gap-1 items-center bg-gradient-to-r from-slate-300 to-slate-500 p-[2px] rounded-md shadow-lg"
                    >
                        <CsImage
                          src={product.image_uris[0]}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="rounded-md m-1"
                        />
                        <div className=" flex flex-col justify-center items-around gap-1">
                          <span className="text-xs">
                            Name: {product.name}
                          </span>
                          <span  className="text-xs">
                            Price: {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(product.pricing[0].price)}
                          </span>
                          <span className="text-xs">
                            Unit: {product.unit}
                          </span>
                          <span className="text-xs">
                            Brand: {product.brand}
                          </span>
                        </div>
                    </ListItem>
                  ))}
                  </ul>
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
