import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  Text,
  GetServerSideComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { PcmProduct } from 'src/types/product';
import { getProduct } from 'src/services/graphQLService';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
  product: PcmProduct;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Block = (props: PromoProps): JSX.Element => {

  const id = props.params.RenderingIdentifier;
  const { productName, productLongDescription, pCMPriceToProduct, pCMProductToAsset } = {...props.product};

  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {// lelijke demo ready filter om de eerste 'originele' versie waar een daadwerkelijk plaatje van bestaat de vinden.
              <img alt="test" src={"https://vgz-innovatie.sitecoresandbox.cloud/api/public/content/" + pCMProductToAsset.results.filter(x => x.assetToPublicLink.total > 0)[0].assetToPublicLink.results.find(x => x.relativeUrl != undefined && x.relativeUrl.includes('original'))?.relativeUrl}></img>
            }
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                {
                  props.product && productLongDescription?.['en-US'] && productLongDescription?.['en-US'].length > 0 ?
                    <>
                      <div className="product-identifier">
                        <h2>{productName}</h2>
                        <p>
                          <span>{pCMPriceToProduct}</span>
                          per maand
                        </p>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: productLongDescription?.['en-US'] }} />
                    </> : <JssRichText field={props.fields.PromoText} />
                }
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <PromoDefaultComponent {...props} />;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const getServerSideProps: GetServerSideComponentProps = async (rendering, _layoutData) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const id = (rendering as any).fields?.PromoText2.value;
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

export const WithText = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PromoIcon} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text className="promo-text" field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promotext">
              <Text className="promo-text" field={props.fields.PromoText2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
