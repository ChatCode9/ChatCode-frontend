export interface Scrap {
  articleTitle: string;
  dateCreated: string;
}

export interface ScrapData {
  code: number;
  data: Scrap[];
  message: string;
}
