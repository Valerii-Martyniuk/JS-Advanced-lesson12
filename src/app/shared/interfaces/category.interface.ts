export interface CategoryRequest {
  name: string;
  path: string;
  imagePath: string;
}
export interface CategoryResponse extends CategoryRequest {
  id: number;
}
