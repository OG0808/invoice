"use client";

import useStore from "@/store/useStore";
import { Card, CardContent } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { motion } from "framer-motion";
import { statusInfo } from "@/invoiceStatusUtils/invoiceStatusUtils";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UpdateInvoice from "../updateInvoice/UpdateInvoice";

const InvoiceCard = ({ params }: { params: string }) => {
  const markInvoiceAsPaid = useStore((state) => state.markInvoiceAsPaid);
  const invoice = useStore((state) => state.invoices);
  const deleteInvoice = useStore((state) => state.deleteInvoice);

  const router = useRouter();

  const handleDeleteInvoice = () => {
    deleteInvoice(params);
    toast.error(`${filInv.clientName}`, {
      description: "Invoice has been deleted",
    });
    router.push("/invoices");
  };
  const filInv = invoice.filter((inv) => inv.id === params)[0];

  if (!filInv) {
    return;
  }

  const { city, country, postCode, street } = filInv?.senderAddress;
  const { clientName, createdAt, paymentDue, clientEmail, status } = filInv;
  const { clientAddress } = filInv;
  return (
    <section className="flex flex-col gap-10 h-screen overflow-auto pt-20">
      <Link href={"/invoices"}>
        <Button className="w-fit flex gap-3">
          <i className="bx bxs-left-arrow"></i> back
        </Button>
      </Link>

      <Card>
        <CardContent
          className="flex justify-between
        p-5 items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1 * 0.2 } }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 dark:bg-gray-900 bg-gray-50 p-5 rounded-lg"
          >
            <span className="text-gray-400 text-sm font-bold">status</span>
            <span className={`${statusInfo(status)} rounded-lg`}>
              <div></div>
              {status}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1 * 0.2 } }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 dark:bg-gray-900 bg-gray-50 p-5 rounded-lg"
          >
            <UpdateInvoice/>
            <Button
              onClick={handleDeleteInvoice}
              className="font-bold"
              variant={"destructive"}
            >
              Delete
            </Button>
            {filInv.status !== "paid" ? (
              <Button
                className="font-bold text-green-600 bg-green-200 hover:bg-opacity-80"
                onClick={() => markInvoiceAsPaid(filInv.id)}
              >
                Mark as Paid
              </Button>
            ) : (
              ""
            )}
          </motion.div>
        </CardContent>
      </Card>
      <Card className="w-full pt-6 ">
        <CardContent className=" flex flex-col gap-4">
          <motion.section
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 2 * 0.2 } }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between w-full dark:bg-gray-900 bg-gray-50 p-5 rounded-lg"
          >
            <div className=" flex flex-col gap-3">
              <p className="font-bold">
                <span className="text-gray-400">#</span>
                {filInv.id}
              </p>
              <p className="text-gray-400 text-sm">{filInv.description}</p>
            </div>
            <div className="text-right  ">
              <p className="text-gray-400 text-sm">{street}</p>
              <p className="text-gray-400 text-sm">{city}</p>
              <p className="text-gray-400 text-sm">{postCode}</p>
              <p className="text-gray-400 text-sm">{country}</p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 3 * 0.2 } }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="flex gap-28 bg-gray-50 p-5 rounded-lg dark:bg-gray-900 "
          >
            <article className="flex flex-col gap-9">
              <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-sm">Invoice Date</p>
                <p className="font-bold">{createdAt}</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-gray-400 text-sm">Payment Due</p>
                <p className="font-bold">{paymentDue}</p>
              </div>
            </article>

            <article className="flex flex-col gap-3">
              <div>
                <p className="text-gray-400 text-sm">Bill To</p>
              </div>
              <div>
                <p className="font-bold">{clientName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">{clientAddress.street}</p>
                <p className="text-gray-400 text-sm">{clientAddress.city}</p>
                <p className="text-gray-400 text-sm">
                  {clientAddress.postCode}
                </p>
                <p className="text-gray-400 text-sm">{clientAddress.country}</p>
              </div>
            </article>

            <article className="flex flex-col gap-3">
              <p className="text-gray-400 text-sm">Sent to</p>
              <p className="font-bold">{clientEmail}</p>
            </article>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 4 * 0.2 } }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 p-5 rounded-lg dark:bg-gray-900 "
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[16px]">Item Name</TableHead>
                  <TableHead className="text-[16px]">QTY.</TableHead>
                  <TableHead className="text-[16px]">Price</TableHead>
                  <TableHead className="text-[16px]">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filInv.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold">{item.name}</TableCell>
                    <TableCell className="text-gray-400 font-bold">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="font-bold text-gray-400">
                      £ {item.price}
                    </TableCell>
                    <TableCell className="font-bold">£ {item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.section>
        </CardContent>
      </Card>
    </section>
  );
};

export default InvoiceCard;
