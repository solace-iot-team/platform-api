import AppAPIProducts = Components.Schemas.AppApiProducts;
import AppApiProductsComplex = Components.Schemas.AppApiProductsComplex;
import {isString} from './typehelpers';
export class APIProductsTypeHelper {
  public apiProductReferencesToStringArray(apiProducts: AppAPIProducts): string[] {
    const productNames: string[] = [];
    for (const apiProductReference of apiProducts) {
      let productName: string = null;
      if (isString(apiProductReference)) {
        productName = apiProductReference as string;
      } else {
        productName = (apiProductReference as AppApiProductsComplex).apiproduct;
      }

      
      productNames.push(productName);
    }
    return productNames;
  }

  public apiProductReferenceToString(apiProductReference: string | AppApiProductsComplex): string{
      let productName: string = null;
      if (isString(apiProductReference)) {
        productName = apiProductReference as string;
      } else {
        productName = (apiProductReference as AppApiProductsComplex).apiproduct;
      }
      return productName;

  }

  public apiProductReferenceStatus(apiProductReference: string | AppApiProductsComplex): string{
      let status: string = null;
      if (isString(apiProductReference)) {
        status = 'approved';
      } else {
        status = (apiProductReference as AppApiProductsComplex).status;
      }
      return status;

  }

    public isApiProductReferenceApproved(apiProductReference: string | AppApiProductsComplex): boolean{
      const status: string = this.apiProductReferenceStatus(apiProductReference);
      return (status == 'approved');

  }

}

export default new APIProductsTypeHelper();