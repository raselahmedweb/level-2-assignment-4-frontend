export interface IBook {
  _id: string | "";
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  imageUrl?: string;
  available: boolean;
}

export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface ApiError {
  data: {
    error: {
      errors: {
        [key: string]: {
          message: string;
        };
      };
    };
    message?: string;
  };
}
