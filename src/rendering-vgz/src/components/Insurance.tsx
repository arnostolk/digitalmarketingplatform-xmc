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
                <h3>{props.product?.productName}</h3>
                {
                  props.product ?
                  <div dangerouslySetInnerHTML={{ __html: props.product.productLongDescription?.['en-US'] }} /> : null
                }
                {/* <JssRichText field={props.fields.PromoText} /> */}
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
                <h3>{props.product?.productName}</h3>
                {
                  props.product ?
                  <div dangerouslySetInnerHTML={{ __html: props.product.productLongDescription?.['en-US'] }} /> : null
                }
                {/* <JssRichText field={props.fields.PromoText} /> */}
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
