export interface ProductRequest {
  category: string;
  name: string;
  path: string;
  weight: number;
  consist: string;
  price: number;
  imagePath: string;
}

export interface ProductResponse extends ProductRequest {
  id: number;
  count: number;
}
