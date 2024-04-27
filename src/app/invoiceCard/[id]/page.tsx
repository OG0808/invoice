
import InvoiceCard from "@/components/invoiceCard/InvoiceCard";
import { Button } from "@/components/ui/button";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <section className="max-w-[800px] w-full flex flex-col gap-10  mx-auto overflow-auto">
   
      <InvoiceCard params={params.id} />
    </section>
  );
};

export default page;
