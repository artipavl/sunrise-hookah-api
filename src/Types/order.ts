import Feedback from "./feedback";
interface Tovar {
  id: string;
  baskeQuantity: number;
}
interface Limitations {
  Width: number;
  Height: number;
  Length: number;
}

interface Week {
  Monday: string;
  Tuesday: string;
  Wednesday: string;
  Thursday: string;
  Friday: string;
  Saturday: string;
  Sunday: string;
}

interface Warehous {
  SiteKey: string;
  Description: string;
  DescriptionRu?: string;
  ShortAddress?: string;
  ShortAddressRu?: string;
  Phone?: string;
  TypeOfWarehouse?: string;
  Ref: string;
  Number?: string;
  CityRef: string;
  CityDescription?: string;
  CityDescriptionRu?: string;
  SettlementRef?: string;
  SettlementDescription?: string;
  SettlementAreaDescription?: string;
  SettlementRegionsDescription?: string;
  SettlementTypeDescription?: string;
  SettlementTypeDescriptionRu?: string;
  Longitude?: string;
  Latitude?: string;
  PostFinance?: string;
  BicycleParking?: string;
  PaymentAccess?: string;
  POSTerminal?: string;
  InternationalShipping?: string;
  SelfServiceWorkplacesCount?: string;
  TotalMaxWeightAllowed?: string;
  PlaceMaxWeightAllowed?: string;
  SendingLimitationsOnDimensions?: Limitations;
  ReceivingLimitationsOnDimensions?: Limitations;
  Reception?: Week;
  Delivery?: Week;
  Schedule?: Week;
  DistrictCode?: string;
  WarehouseStatus?: string;
  WarehouseStatusDate?: string;
  WarehouseIllusha?: string;
  CategoryOfWarehouse?: string;
  Direct?: string;
  RegionCity?: string;
  WarehouseForAgent?: string;
  GeneratorEnabled?: string;
  MaxDeclaredCost?: string;
  WorkInMobileAwis?: string;
  DenyToSelect?: string;
  CanGetMoneyTransfer?: string;
  OnlyReceivingParcel?: string;
  PostMachineType?: string;
  PostalCodeUA?: string;
  WarehouseIndex?: string;
  BeaconCode?: string;
}

export type AddOrder = {
  customer: Feedback;
  orders: Tovar[];
  delivery: Warehous;
};

export type Order = AddOrder & {
  id: string;
  status: "new" | "paid" | "accepted" | "done";
  date: number;
};
