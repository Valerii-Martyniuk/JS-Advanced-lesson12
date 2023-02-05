export interface ActionRequest {
  date: string;
  name: string;
  title: string;
  description: string;
  imagePath: string;
}
export interface ActionResponse extends ActionRequest {
  id: number;
}
