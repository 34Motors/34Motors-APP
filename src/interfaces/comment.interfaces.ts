interface commentReturn {
  id: number;
  description: string;
  postDate: Date;
  userId: number;
  carId: number;
  user: {
    id: number;
    name: string;
  };
}

export type { commentReturn };
