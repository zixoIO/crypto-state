import { ICryptoPriceService } from "../../types/iCryptoPriceService";
import { ICryptoPrices } from "../../types/responses";
import { BlockChair } from "./services/blockchair";
import { mapLimit } from "async";
import _ from "lodash";

export class Price {
  private _prices: ICryptoPrices;
  private readonly interval: number;
  private readonly services: ICryptoPriceService[] = [new BlockChair()];
  private async refreshPrices(): Promise<void> {
    const prices: ICryptoPrices[] = await mapLimit<ICryptoPriceService, ICryptoPrices>(this.services, 5, (service: ICryptoPriceService, cb: (err: Error, results?: ICryptoPrices) => void): void => {
      service.prices().then((price: ICryptoPrices): void => {
        cb(undefined, price);
      }).catch((err: Error): void => { cb(err); });
    });
    this._prices = {
      BTC: _.meanBy(prices, (prices: ICryptoPrices): number =>
        prices.BTC),
      BCH: _.meanBy(prices, (prices: ICryptoPrices): number =>
        prices.BCH),
      BSV: _.meanBy(prices, (prices: ICryptoPrices): number =>
        prices.BSV),
      ETH: _.meanBy(prices, (prices: ICryptoPrices): number =>
        prices.ETH),
    };
    setTimeout(this.refreshPrices.bind(this), this.interval);
  }
  public constructor(interval: number) {
    this.interval = interval;
    this.refreshPrices().catch((err: Error): void => {
      console.log(err);
      setTimeout(this.refreshPrices.bind(this), this.interval);
    });
  }
  public prices(): ICryptoPrices {
    return this._prices;
  }
}
