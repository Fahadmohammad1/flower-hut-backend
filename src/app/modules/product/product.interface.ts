export enum sizes {
  "Small",
  "Standard",
  "Medium",
  "Large",
  "Lavish",
  "Opulent",
  "Extravagant",
}

export type IProduct = {
  name: string;
  image: string;
  prices: [{ price: number; size: sizes }];
  description: string;
  ownerEmail: string;
};
