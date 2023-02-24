import { LongString } from "./LongString";
import { RelativeAssetLink } from "./RelativeAssetLink";

export type PcmProduct = {
	id: string;
	productName: string;
	pCMPriceToProduct: number;
	productShortDescription: LongString;
	productLongDescription: LongString;
	productReimbursement: LongString;
	productNonReimbursement: LongString;
	productLabel: LongString;
	yearToPCMProduct: {
		taxonomyLabel: LongString;
	};
	pCMProductToAsset: {
		total: number;
		results: RelativeAssetLink[];
	}
}
