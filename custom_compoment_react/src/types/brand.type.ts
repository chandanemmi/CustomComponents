interface Tenant {
  tenant: string;
  categories: unknown;
}

export interface BrandObj {
  isExisting: boolean;
  status: string;
  name: string;
  tenants: Tenant[];
  displayName: null | string;
}

export type BrandListArray = BrandObj[];

export interface ITenantDetail {
  tenant: string;
  status: string;
  remarks?: string;
  categories: string[];
}

export interface IBrandLogo {
  documentType: string;
  documentLink: string;
}

export interface IDocumentDetails {
  documentLink: string;
  documentType: string;
}

export interface ITrademarkInfo {
  appliedForTrademark: boolean;
  applicationInfo?: {
    applicationNumber: string;
    signature: string;
  };
}

export interface ISupportingDocument {
  availableDocument: string;
  trademarkInfo?: ITrademarkInfo;
  trademarkCertificate?: {
    documentType: string;
    documentLink: string;
  };
  brandAuthorisationLetter?: {
    documentType: string;
    documentLink: string;
  };
}

export interface IBrandDetails {
  isExisting: boolean;
  status: string;
  name: string;
  tenants: {
    tenant: string;
    status: string;
    remarks?: string;
    categories: string[];
  }[];
  brandLogo: {
    documentLink: string;
    documentType: string;
  };
  supportingDocument: ISupportingDocument;
}

export interface Category {
  _id: string;
  label: string;
}

export interface TenantCategoryModel {
  _id: string;
  tenantIdRef: string;
  businessModel: string;
  categories: Category[];
  paymentTerms: number[];
}

export interface Brand {
  tenantIdRef: string;
  businessModel: string;
  categories: Category[];
  paymentTerms: number[];
}

export interface FormValues {
  selectedTenants: string[];
  selectedCategoriesTenants: Record<string, string[]>;
}

export interface TradeMarkApplicationDetails {
  applicationNumber: string;
  signature: string;
}

export interface Payload {
  name?: string | undefined | null;
  tenants?: Tenant[];
  brandLogo?: IBrandLogo;
  supportingDocument?: ISupportingDocument;
}