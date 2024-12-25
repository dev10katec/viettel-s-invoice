interface IViettelSInvoice {
  apiEndPoint?: string
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
  invoiceType?: string
  templateCode: string
  invoiceSeries: string
  currencyCode: string
  exchangeRate: string | number
  invoiceNote?: string
  adjustmentType?: string
  paymentStatus: boolean
  cusGetInvoiceRight?: boolean
  invoiceIssuedDate?: number | string
  transactionUuid?: number | string
  reservationCode?: number | string
}

interface BuyerInfo {
  buyerName: string
  buyerLegalName?: string
  buyerTaxCode?: string
  buyerAddressLine: string
  buyerPostalCode?: string
  buyerDistrictName?: string
  buyerCityName?: string
  buyerCountryCode?: string
  buyerPhoneNumber?: string
  buyerEmail?: string
  buyerBankName?: string
  buyerBankAccount?: string
  buyerCode?: string
  buyerBirthDay?: string
  buyerNotGetInvoice?: string
}

interface SellerInfo {
  sellerLegalName: string
  sellerTaxCode?: string
  sellerAddressLine: string
  sellerPhoneNumber?: string
  sellerFaxNumber?: string
  sellerEmail?: string
  sellerBankName?: string
  sellerBankAccount?: string
  sellerWebsite?: string
}

interface Payment {
  paymentMethod: string
  paymentMethodName: string
}

interface DeliveryInfo {}

interface ItemInfo {
  lineNumber?: number
  selection?: number
  itemCode?: string
  itemName?: string
  unitName?: string
  unitPrice?: number
  quantity?: number
  itemTotalAmountWithoutTax: number
  itemTotalAmountAfterDiscount?: number
  taxPercentage: number
  taxAmount: number
  itemDiscount: number
  isIncreaseItem?: boolean | null
}

interface SummarizeInfo {
  sumOfTotalLineAmountWithoutTax: number
  totalAmountWithoutTax: number
  totalTaxAmount: number
  totalAmountWithTax: number
  totalAmountWithTaxInWords?: string
}

interface TaxBreakdown {
  taxPercentage: number
  taxableAmount: number
  taxAmount: number
}

interface IDraftInvoicePreviewResponse {
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

interface IViettelSInvoiceDetailsResponse {
  errorCode: any
  description: any
  totalRows: number
  invoices: Invoice[]
}

interface Invoice {
  invoiceId: number
  invoiceType: string
  adjustmentType: string
  templateCode: string
  invoiceSeri: string
  invoiceNumber: string
  invoiceNo: string
  currency: string
  total: number
  issueDate: number
  issueDateStr: any
  state: number
  requestDate: any
  description: any
  buyerIdNo: any
  stateCode: number
  subscriberNumber: any
  paymentStatus: number
  viewStatus: any
  downloadStatus: any
  exchangeStatus: number
  numOfExchange: any
  createTime: number
  contractId: any
  contractNo: any
  supplierTaxCode: string
  buyerTaxCode: string
  totalBeforeTax: number
  taxAmount: number
  taxRate: any
  paymentMethod: string
  paymentTime: any
  customerId: any
  no: any
  paymentStatusName: string
  buyerName: string
  transactionUuid: string
  originalInvoiceId: any
}

export {
  IViettelSInvoice,
  IViettelSInvoiceLoginResponse,
  IInvoice,
  IDraftInvoicePreviewResponse,
  IViettelSInvoiceResponse,
  IViettelSInvoiceDetailResponse,
  IViettelSInvoiceGetFileResponse,
  IViettelSInvoiceDetailsResponse
}
