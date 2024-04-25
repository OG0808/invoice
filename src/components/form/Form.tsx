"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Invoice, Item } from "@/types/interface";
import Data from "../../app/data.json";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useStore from "@/store/useStore";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export function Formulario() {
  const item = useStore((state) => state.items);
  const show = useStore((state) => state.showForm);
  const addNewItem = useStore((state) => state.addNewItem);
  const removeItem = useStore((state) => state.removeItem);
  const setShow = useStore((state) => state.setShowForm);
  const setInvoices = useStore((state) => state.setInvoices);
  const setDraft = useStore((state) => state.setDraft);
  const draft = useStore((state) => state.draft);
  const invoices = useStore((state) => state.invoices);
  const [date, setDate] = useState<Date>();
  const [paymentTerms, setPaymentTerms] = useState<number>();
  const totalItems = item.reduce((a, b) => a + b.total, 0);
  const { register, handleSubmit, reset } = useForm<Invoice>();
  
  const onSubmit  =  (data: Invoice) => {
  const  newInvoice  = {
      ...data,
      id: uuidv4().slice(0, 8),
      createdAt: new Date().toDateString(),
      status: draft ,
      items: item,
      paymentDue: date?.toDateString(),
      paymentTerms: paymentTerms,
      total: totalItems,
    };
    reset();
    if (draft == "draft" || draft == "pending") {
      setInvoices([...invoices, newInvoice]);
    }
    
  };


  

  const handleInputChange = (id: string, field: keyof Item, value: string) => {
    const newItems = [...item];
    const itemIndex = newItems.findIndex((item) => item.id === id);
    const oldItem = newItems[itemIndex];
    const oldValue = oldItem[field];
    if (value !== oldValue.toString()) {
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        [field]: field === "name" ? value : parseFloat(value),
      };
      newItems[itemIndex].total =
        newItems[itemIndex].quantity * newItems[itemIndex].price;
      useStore.setState({ items: newItems });
    }
  };

  const handleSelect = (e: string) => {
    const value = parseInt(e);
    setPaymentTerms(value);
  };

  

  console.log(draft);
  
useEffect(() => {
  setInvoices(Data)
}, [])



  return (
    <>
      <Sheet open={show ? true : false}>
        <SheetTrigger asChild></SheetTrigger>

        <SheetContent side={"left"} className=" rounded-r-xl flex items-center ">
          <ScrollShadow size={100} className="h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`flex flex-col transition duration-700 justify-between  max-w-lg dark:bg-slate-900 rounded-r-xl  overflow-auto rounded-xl`}
          >
            <div className="flex flex-col gap-3 ">
              <span className="font-bold">Bill From</span>

              <article className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 ">
                  <Label className="font-bold">Street Address</Label>
                  <Input
                    {...register("senderAddress.street")}
                    defaultValue="19 Union Terrace"
                  />
                </div>
                <div className="flex gap-3 ">
                  <div className="flex flex-col gap-2 ">
                    <Label  htmlFor="">
                      City
                    </Label>
                    <Input
                      {...register("senderAddress.city")}
                      type="text"
                      defaultValue="London"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label  htmlFor="">
                      Post Code
                    </Label>
                    <Input
                      {...register("senderAddress.postCode")}
                      type="text"
                      defaultValue="E1 3EZ"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label  htmlFor="">
                      Country
                    </Label>
                    <Input
                      {...register("senderAddress.country")}
                      type="text"
                      defaultValue="United Kingdom"
                    />
                  </div>
                </div>
              </article>

              <div className="flex flex-col gap-4">
                <span className="font-bold">Bill To</span>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <Label >Clients Name</Label>
                    <Input
                      {...register("clientName")}
                      type="text"
                      defaultValue="Alex Grim"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label >Clients Email</Label>
                    <Input
                      {...register("clientEmail")}
                      type="email"
                      defaultValue="alexgrim@mail.com"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label >Street Address</Label>
                    <Input
                      {...register("clientAddress.street")}
                      type="text"
                      defaultValue="84 Church Way"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2">
                      <Label  >
                        City
                      </Label>
                      <Input
                        {...register("clientAddress.city")}
                        type="text"
                        defaultValue="Bradford"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label >
                        Post Code
                      </Label>
                      <Input
                        {...register("clientAddress.postCode")}
                        type="text"
                        defaultValue="BD1 9PB"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label >
                        Country
                      </Label>
                      <Input
                        {...register("clientAddress.country")}
                        type="text"
                        defaultValue="United Kingdom"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 ">
                <div className="flex gap-3 items-center justify-between flex-wrap">
                  <div className="flex flex-col gap-2">
                    <Label >Invoice Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] border-2  h-12 text-md justify-start text-left font-normal",
                            !date && "text-muted-foreground dark:bg-slate-900 h-12 text-md  w-[240px] border-2"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 " align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label >Payment Terms</Label>
                    <Select  onValueChange={handleSelect}>
                      <SelectTrigger className="w-[180px] text-md ">
                        <SelectValue placeholder="Select Terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem className="cursor-pointer" value="1">Net 1 Day</SelectItem>
                          <SelectItem className="cursor-pointer" value="7">Net 7 Days</SelectItem>
                          <SelectItem className="cursor-pointer" value="14">Net 14 Days</SelectItem>
                          <SelectItem className="cursor-pointer" value="30">Net 30 Days</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="font-semibold">Project Description</Label>
                  <Input
                    {...register("description")}
                    type="text"
                    defaultValue="Graphic Design"
                  />
                </div>
              </div>
              <div className="overflow-auto max-h-32">
                <Table className="overflow-x-auto">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item Name</TableHead>
                      <TableHead>Qty.</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {item.map((item) => (
                      <TableRow key={item.id} className="">
                        <TableCell>
                          <Input
                            type="text"
                            placeholder="Nombre"
                            value={item.name}
                            onChange={(e) =>
                              handleInputChange(item.id, "name", e.target.value)
                            }
                          />
                        </TableCell>

                        <TableCell>
                          <Input
                            type="number"
                            placeholder="Cantidad"
                            className="w-20"
                            value={item.quantity}
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            className="w-16"
                            type="number"
                            placeholder="Precio"
                            value={item.price}
                            onChange={(e) =>
                              handleInputChange(
                                item.id,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Badge
                            className="py-[9px] px-4 w-fit flex justify-center"
                            variant="outline"
                          >
                            {item.total}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => removeItem(item.id)}
                            className="px-2"
                          
                          >
                            <i className="bx bx-trash bx-sm"></i>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Button
                variant={"outline"}
                className="font-bold"
                type="button"
                onClick={() => addNewItem(item)}
              >
                + Add New Item
              </Button>
            </div>

            <div className="flex justify-between mt-10">
              <Badge className="cursor-pointer text-sm bg-[#f9fafe] text-[#7e88c3] font-bold "  onClick={setShow}>Discard</Badge>
              <div className="flex gap-3">
                <Button className="font-bold" onClick={()=>{setDraft("draft");
                  setShow()
                }} >
                  Save as Draft
                </Button>
                <Button className="font-bold" onClick={()=>{setDraft("pending");
                setShow()}} >
                  Save & Send
                </Button>
              </div>
            </div>
          </form>
          </ScrollShadow>
        </SheetContent>
      </Sheet>
    </>
  );
}
