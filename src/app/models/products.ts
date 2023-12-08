export interface IProducts {
  id: number,
  title: string,
  price: number,
  description: string,
  img?: string,
  details: IProductDetails;
  quantity: number
}
export interface IProductDetails {
  "ketchup": boolean,
  "sauce": boolean,
  "weight": number
}
