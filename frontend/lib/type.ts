export type QuoteType = {
  id: number;
  name: string;
  quote: string;
};

export type FormType = Omit<QuoteType, "id">;

export type FormButtonType = {
  add: boolean;
  update: boolean;
};

export type BooksType = {
  id: string;
  volumeInfo: {
    title: string;
    authors: [string];
    imageLinks: {
      smallThumbnail: string;
    };
    publishedDate: string;
    description: string;
  };
};
