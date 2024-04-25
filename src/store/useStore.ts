import { Invoice, Item } from "@/types/interface";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
interface Props {
  draft: string;
  items: Item[];
  invoices: Invoice[];
  invoicesFiltered: Invoice[];
  showForm: boolean;
  addNewItem: (items: Item[]) => void;
  removeItem: (id: string) => void;
  setShowForm: () => void;
  setInvoices: (invoices: Invoice[]) => void;
  setIinvoicesFiltered: (invoicesFiltered: Invoice[]) => void;
  setDraft: (draft: string) => void;
  deleteInvoice:(id: string) => void;
  markInvoiceAsPaid: (id:string) => void;
}

const useStore = create<Props>((set) => ({
  draft: "",
  items: [
    { id: uuidv4().slice(0, 8), name: "", quantity: 0, price: 0, total: 0 },
  ],
  showForm: false,
  invoices: [],
  invoicesFiltered: [],
  setDraft: (newDraft) => set({ draft: newDraft }),
  setIinvoicesFiltered: (invoicesFiltered) => set({ invoicesFiltered }),
  setInvoices: (invoices) => set({ invoices }),
  setShowForm: () => set((state) => ({ showForm: !state.showForm })),
  addNewItem: (items) =>
    set({
      items: [
        ...items,
        { id: uuidv4().slice(0, 8), name: "", quantity: 0, price: 0, total: 0 },
      ],
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  deleteInvoice:(id)=> set((state)=> ({invoices: state.invoices.filter((inv)=> inv.id !== id) })),
  markInvoiceAsPaid:(id) => set((state)=>({ invoices: state.invoices.map((inv)=>{
    if(inv.id === id){
      return { ...inv, status: "paid" }; 
    }else{
      return inv;
    }
  })}))
}));

export default useStore;
