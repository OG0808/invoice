// Generated by https://quicktype.io

import { JSXElementConstructor } from "react";

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue?: string;
  description: string;
  paymentTerms?: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export enum Country {
  Empty = "",
  UnitedKingdom = "United Kingdom",
  UnitedStatesOfAmerica = "United States of America",
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
  id:string
}
