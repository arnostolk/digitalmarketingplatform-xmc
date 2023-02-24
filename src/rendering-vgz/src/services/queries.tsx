import gql from 'graphql-tag';

export const GET_PRODUCTS_QUERY = gql`
{
	allM_PCM_Product {
	  results {
		productName
		pCMPriceToProduct
		productShortDescription
		productLongDescription
	  }
	}
  }
`;

//"0PGgnROQq067_P2aKEH96w"
export const GET_PRODUCT_QUERY = gql`
query product($id: String!){
	m_PCM_Product(id: $id) {
		 id
      productName
      
      pCMPriceToProduct
      productShortDescription
      productLongDescription
      productReimbursement
      productNonReimbursement
			productLabel
      
      yearToPCMProduct {
        taxonomyLabel
      }
      
      pCMProductToAsset {
        total
        results {
          title
         
          assetToPublicLink {
            total
            results {
              
              relativeUrl
            }
          }
        }
      }
	}
}
`;