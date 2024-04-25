"use client"
import Link from "next/link"; 
import React from "react";
import useStore from "@/store/useStore";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { motion } from "framer-motion";
import { borderStatus, statusInfo } from "@/invoiceStatusUtils/invoiceStatusUtils";



const InvoicesCard = () => {


  
  const invoices = useStore((state) => state.invoices).sort((a, b) => parseInt( b.createdAt)-parseInt( a.createdAt));
  const invoicesFiltered = useStore((state) => state.invoicesFiltered);
  const invoicesToShow = invoicesFiltered.length ? invoicesFiltered : invoices;



  return (
    <ScrollShadow
    size={100}
    className="max-h-[700px] w-full h-full max-w-[800px] flex flex-col gap-5 overflow-auto scroll-smooth"
  >
    {invoicesToShow.map((invoice, index) => (
      <motion.div 
      key={invoice.id}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="w-full ">
    <Link href={`/invoiceCard/${invoice.id}`} className={`
    w-full flex justify-between 
    items-center py-5 px-5 border-2  rounded-lg 
    shadow ${borderStatus(invoice.status)} 
    hover:border-2 transition duration-200`}>
      <div className="flex gap-10 items-center">
        <p className="font-bold ">#{invoice.id}</p>
        <p className="font-medium text-sm text-slate-500">Due {invoice.paymentDue}</p>
        <p className="font-medium text-sm text-slate-500">{invoice.clientName}</p>
      </div>
      <div className="flex items-center gap-7 ">
        <p className="font-bold ">£ {invoice.total}</p>
        <span className={`${statusInfo(invoice.status)} rounded-lg`}>
          <div></div>
          {invoice.status}
        </span>
      </div>
    </Link>
        </motion.div> 
      ))}
        
      </ScrollShadow>
  );
};

export default InvoicesCard;
