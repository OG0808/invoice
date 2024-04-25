"use client";

import useStore from "@/store/useStore";

import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Button } from "../ui/button";


const FilterBar = () => {
  const items = ["paid", "pending",  "draft", "all"];

  const [isRotated, setIsRotated] = useState(false);
  const showForm = useStore((state) => state.setShowForm);
  const invoices = useStore((state) => state.invoices);
  const setIinvoicesFiltered = useStore((state) => state.setIinvoicesFiltered);
  const invoicesLength = useStore((state) => state.invoices).length;

  
  const handleFilterInv = (item: string) => {
    const filterInv = invoices.filter((invoice) => invoice.status === item);
    setIinvoicesFiltered(filterInv);
  };
 
  return (
    <section className="flex max-w-[800px] w-full justify-between mt-16 items-center ">
      <div className="flex flex-col">
        <span className="font-bold text-black dark:text-white text-4xl">
          Invoices
        </span>
        <span className="text-sm">
          There are {invoicesLength} total invoices
        </span>
      </div>

      <div className="flex gap-3">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => setIsRotated(!isRotated)}
              className="font-bold flex gap-2 items-center cursor-pointer"
            >
              Filter by status
              <i
                className={`bx bxs-down-arrow focus:rotate-180 transition`}
              ></i>
            </MenubarTrigger>

            <MenubarContent>
              {items.map((item) => (
                <MenubarItem
                  onClick={() => handleFilterInv(item)}
                  className="cursor-pointer"
                  key={item}
                >
                  {item}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Button className="flex gap-2 font-bold" onClick={showForm}>
          <i className="bx bxs-plus-circle bx-sm"></i>
          New Invoice
        </Button>
      </div>
    </section>
  );
};

export default FilterBar;
