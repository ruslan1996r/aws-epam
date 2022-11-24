export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  count: number,
  id: string,
  title: string,
  description: string,
  price: number,
}

export type Cart = {
  id: string,
  items: CartItem[],
}
