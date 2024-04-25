

import FilterBar from "@/components/filterBar/FilterBar";
import InvoicesCard from "@/components/invoicesCard/InvoicesCard";



const page = () => {

  


  return (
    <div className="h-screen max-w-[800px] mx-auto w-full flex flex-col items-center gap-20 ">
     
      <FilterBar />
      
    
      <InvoicesCard />
      
        
    
    </div>
  );
};

export default page;
