export enum categories {
  Small = "Small",
  Standard = "Standard",
  Medium = "Medium",
  Large = "Large",
  Lavish = "Lavish",
  Opulent = "Opulent",
  Extravagant = "Extravagant",
}

export type IProduct = {
  name: string;
  image: string;
  price: number;
  category: categories;
  description: string;
  ownerEmail: string;
};

export type IQueryies = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};
