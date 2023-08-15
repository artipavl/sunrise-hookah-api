interface TwoLeng {
  ua: string;
  en: string;
}

type Tovar = {
  name: TwoLeng;
  cost: number;
  description: TwoLeng;
  parameters: TwoLeng;
  completeSet: TwoLeng;
  quantity: number;
  popularity: number;
  type: string;
  fotos?: string[];
};

export default Tovar;
