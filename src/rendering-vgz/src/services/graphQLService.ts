import { ApolloClient, ApolloQueryResult } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GET_PRODUCT_QUERY } from './queries';
import { ProductIdParameterType } from 'src/types/inputTypes';
import { PcmProduct } from 'src/types/product';
import { M_Pcm_Product } from './vgz.contenthub';

const config = {
	"token": "emVVOE8weS9OTkNUa1dUNGN1dHppeHVxQjExRE0zUlhWL3FjWFZUOU1WWT18dmd6LWlubm92YXRpZTdjOTc4YmQ2",
	"host": "https://vgz-innovatie.sitecoresandbox.cloud/api/graphql/preview/v1",
};

const link = createHttpLink({
	headers: {
		'X-GQL-Token': config.token,
	},
	uri: config.host,
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

export async function getProduct(variables: ProductIdParameterType): Promise<M_Pcm_Product> {
	const result = await client.query({
		query: GET_PRODUCT_QUERY, variables
	});
	return result.data;
}