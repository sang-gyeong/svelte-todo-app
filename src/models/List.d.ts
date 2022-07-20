declare namespace List {
  interface Item {
    pos?: number;
    id: string;
    color?: string;
    title: string;
    cards?: Card.Item[];
  }
}
