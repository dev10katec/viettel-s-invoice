interface IViettelSInvoice {
  apiEndPoint: string
  username: string
  password: string
}

interface IViettelSInvoiceLoginResponse {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  scope: string
  iat: number
  invoice_cluster: string
  type: number
  jti: string
}

interface IInvoice {
  generalInvoiceInfo: GeneralInvoiceInfo
  buyerInfo: BuyerInfo
  sellerInfo: SellerInfo
  payments: Payment[]
  deliveryInfo: DeliveryInfo
  itemInfo: ItemInfo[]
  discountItemInfo: any[]
  summarizeInfo: SummarizeInfo
  taxBreakdowns: TaxBreakdown[]
}

interface GeneralInvoiceInfo {
  invoiceType: string
  templateCode: string
  invoiceSeries: string
  currencyCode: string
  exchangeRate: string
  invoiceNote: string
  adjustmentType: string
  paymentStatus: boolean
  cusGetInvoiceRight: boolean
  invoiceIssuedDate: any
  transactionUuid: any
  reservationCode: any
}

interface BuyerInfo {
  buyerName: string
  buyerLegalName: string
  buyerTaxCode: string
  buyerAddressLine: string
  buyerPostalCode: string
  buyerDistrictName: string
  buyerCityName: string
  buyerCountryCode: string
  buyerPhoneNumber: string
  buyerEmail: string
  buyerBankName: string
  buyerBankAccount: string
  buyerCode: string
  buyerBirthDay: string
  buyerNotGetInvoice: string
}

interface SellerInfo {
  sellerLegalName: string
  sellerTaxCode: string
  sellerAddressLine: string
  sellerPhoneNumber: string
  sellerFaxNumber: string
  sellerEmail: string
  sellerBankName: string
  sellerBankAccount: string
  sellerWebsite: string
}

interface Payment {
  paymentMethod: string
  paymentMethodName: string
}

interface DeliveryInfo {}

interface ItemInfo {
  lineNumber: number
  selection: number
  itemCode: string
  itemName: string
  unitName?: string
  unitPrice?: number
  quantity?: number
  itemTotalAmountWithoutTax?: number
  itemTotalAmountAfterDiscount?: number
  taxPercentage: number
  taxAmount: number
  itemDiscount: number
  isIncreaseItem?: boolean
}

interface SummarizeInfo {
  sumOfTotalLineAmountWithoutTax: number
  totalAmountWithoutTax: number
  totalTaxAmount: number
  totalAmountWithTax: number
  totalAmountWithTaxInWords: string
}

interface TaxBreakdown {
  taxPercentage: number
  taxableAmount: number
  taxAmount: number
}

interface IDraftInvoiceResponse {
  errorCode: any
  description: any
  fileToBytes: string
  paymentStatus: boolean
  fileName: string
}

interface IViettelSInvoiceResponse {
  errorCode: any
  description: any
  result: IInvoiceResult
}

interface IInvoiceResult {
  supplierTaxCode: string
  invoiceNo: string
  transactionID: string
  reservationCode: string
  codeOfTax: string
}

interface IViettelSInvoiceDetailResponse {
  transactionUuid: string
  errorCode: any
  description: any
  result: IViettelSInvoiceDetailResult[]
}

interface IViettelSInvoiceDetailResult {
  supplierTaxCode: string
  invoiceNo: string
  reservationCode: string
  issueDate: number
  status: string
}

interface IViettelSInvoiceGetFileResponse {
  errorCode: number
  description: any
  fileToBytes: string
  paymentStatus: boolean
  fileName: string
}

export {
  IViettelSInvoice,
  IViettelSInvoiceLoginResponse,
  IInvoice,
  IDraftInvoiceResponse,
  IViettelSInvoiceResponse,
  IViettelSInvoiceDetailResponse,
  IViettelSInvoiceGetFileResponse
}
