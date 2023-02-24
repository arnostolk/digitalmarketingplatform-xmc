import React from 'react';
import {
  Field,
  GetServerSideComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { PcmProduct } from 'src/types/product';
import { getProduct } from 'src/services/graphQLService';

interface Fields {
  ContentHubGuid: Field<string>;
}

type InsuranceProps = {
  params: { [key: string]: string };
  fields: Fields;
  product: PcmProduct;
};

const InsuranceDefaultComponent = (props: InsuranceProps): JSX.Element => (
  <div className={`component Insurance ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Insurance</span>
    </div>
  </div>
);

export const Default = (props: InsuranceProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const { productName, productLongDescription } = { ...props.product };

  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {/* Image */}
            {/* <JssImage field={props.fields.PromoIcon} /> */}
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <h3>{productName}</h3>
                {
                  productLongDescription ?
                    <div dangerouslySetInnerHTML={{ __html: productLongDescription?.['en-US'] }} /> : null
                }
              </div>
            </div>
            <div className="field-promolink">
              {/* Promo link */}
              {/* <JssLink field={props.fields.PromoLink} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <InsuranceDefaultComponent {...props} />;
};

export const Details = (props: InsuranceProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  const { productName, productLongDescription, pCMPriceToProduct, productReimbursement, productNonReimbursement, pCMProductToAsset } = { ...props.product };

  if (props.fields) {
    return (
      <div className={`component rich-text demo-details ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {/* Image */}
            {/* <JssImage field={props.fields.PromoIcon} /> */}
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <h1>{productName} voor {pCMPriceToProduct}</h1>
                {
                  props.product && productLongDescription?.['en-US'] && productLongDescription?.['en-US'].length > 0 ?
                    <div className="demo-details__kader" dangerouslySetInnerHTML={{ __html: productLongDescription?.['en-US'] }} /> : null
                }
              </div>

              <h2>Wat vergoedt de basisverzekering?</h2>
              <p>De overheid bepaalt welke zorgkosten de basisverzekering vergoedt. Hieronder zie je voorbeelden van zorg die wel of niet uit de basisverzekering vergoed worden.</p>

              <div className="demo-details__procons">
                {
                  props.product && productReimbursement?.['en-US'] && productReimbursement?.['en-US'].length > 0 ?
                    <div dangerouslySetInnerHTML={{ __html: productReimbursement?.['en-US'] }} /> : null
                }

                {
                  props.product && productNonReimbursement?.['en-US'] && productNonReimbursement?.['en-US'].length > 0 ?
                    <div dangerouslySetInnerHTML={{ __html: productNonReimbursement?.['en-US'] }} /> : null
                }
              </div>
            </div>
            <div className="field-promolink">
              {/* Promo link */}
              {/* <JssLink field={props.fields.PromoLink} /> */}
            </div>
            <hr />
            <div className="image-variants-demo">
              {pCMProductToAsset.results.map((assets, j) => {
                return assets.assetToPublicLink.results.map((image, i) => {
                  return <div key={i}>
                    <span>{image.relativeUrl}</span>
                    <img alt={image.relativeUrl} src={"https://vgz-innovatie.sitecoresandbox.cloud/api/public/content/" + image.relativeUrl}></img>
                  </div>
                })
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <InsuranceDefaultComponent {...props} />;
};

export const getServerSideProps: GetServerSideComponentProps = async (rendering) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const id = (rendering as any).fields?.ContentHubGuid.value;
  if (id && id.length > 0) {
    const variables = { id };
    const product = await getProduct(variables);
    return {
      product
    }
  } else {
    return null;
  }
};
