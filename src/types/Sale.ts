export interface Sale {
  id: number;
  name: string;
  date: string;
  payWay: {
    id: number;
    name: string;
  };
  price: number;
}
