import { ICryptoPrices } from "../types/responses";
import { Price } from "./libs/price";

export class CryptoPrice {
  private readonly priceService: Price;
  public constructor(interval: number) {
    this.priceService = new Price(interval);
  }
  public prices(): ICryptoPrices {
    return this.priceService.prices();
  }
}
