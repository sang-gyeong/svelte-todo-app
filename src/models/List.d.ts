declare namespace List {
  interface Item {
    order?: number;
    id: string;
    color?: string;
    title: string;
    cards?: Card.Item[];
  }
}
