export interface IProducts {
  id: number,
  title: string,
  price: number,
  description: string,
  img?: string,
  details: IProductDetails;
}
export interface IProductDetails {
  "ketchup": boolean,
  "sauce": boolean
}
