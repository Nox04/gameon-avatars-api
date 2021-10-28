type Attribute = {
  trait_type: string;
  value: string | number;
};

export type Avatar = {
  id: string;
  name: string;
  image: string;
  description: string;
  attributes: Array<Attribute>;
};
