export type product = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    quantity?: number;
  };

  export type GuitarItemProps = {
    product: {
      id: number;
      name: string;
      image: string;
      description: string;
      price: number;
    },
    addToCart: (item: product) => void;
  }