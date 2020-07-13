import * as rpn from "request-promise-native";
import { ICryptoPrices } from "../../../types/responses";
import { ICryptoPriceService } from "../../../types/iCryptoPriceService";

interface ICoinDetails {
  data: {
    market_price_usd: number;
  };
}
interface IBlockchainResponse {
  data: {
    bitcoin: ICoinDetails;
    "bitcoin-cash": ICoinDetails;
    "bitcoin-sv": ICoinDetails;
    ethereum: ICoinDetails;
  };
}
export class BlockChair implements ICryptoPriceService {
  public async prices(): Promise<ICryptoPrices> {
    const body: IBlockchainResponse = await rpn.get("https://api.blockchair.com/stats", {
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
      }, json: true
    }) as IBlockchainResponse;
    const result: ICryptoPrices = {
      BTC: body.data.bitcoin.data.market_price_usd,
      BCH: body.data["bitcoin-cash"].data.market_price_usd,
      BSV: body.data["bitcoin-sv"].data.market_price_usd,
      ETH: body.data.ethereum.data.market_price_usd
    };

    return result;
  }
}
