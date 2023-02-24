import { RelativeAssetLink } from "./RelativeAssetLink";

export type ContentHubAsset = {
	title: string;
	assetToPublicLink: {
		total: number;
		results: RelativeAssetLink[];
	}
}
