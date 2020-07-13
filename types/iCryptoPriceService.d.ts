import { ICryptoPrices } from "./responses";

export interface ICryptoPriceService {
  prices(): Promise<ICryptoPrices>;
}
