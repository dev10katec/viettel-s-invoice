import {
  ViettelSInvoiceCreateInvoiceException,
  ViettelSInvoiceGetInvoiceException,
  ViettelSInvoiceGetInvoiceFileException,
  ViettelSInvoiceGetInvoicesException,
  ViettelSInvoiceGetTemplatesException,
  ViettelSInvoiceLoginException,
  ViettelSInvoicePreviewDraftInvoiceException
} from '../src/exceptions'
import {
  IViettelSInvoiceDraftInvoicePreviewResponse,
  IViettelSInvoice,
  IViettelSInvoiceDetailResponse,
  IViettelSInvoiceDetailsResponse,
  IViettelSInvoiceGetFileResponse,
  IViettelSInvoiceLoginResponse,
  IViettelSInvoiceResponse,
  IViettelSInvoiceGetTemplatesResponse
} from '../src/interfaces/viettel-s-invoice'
import { GetInvoiceFileParams } from '../src/types'
import ViettelSInvoice from '../src/viettel-s-invoice'
import axios from 'axios'

jest.mock('axios')

const mockAxios = axios as jest.Mocked<typeof axios>

describe('ViettelSInvoice', () => {
  const mockCredentials = {
    apiEndPoint: 'https://api.example.com',
    username: 'test_user',
    password: 'test_password'
  }

  let viettelSInvoice: ViettelSInvoice

  beforeEach(() => {
    viettelSInvoice = new ViettelSInvoice(mockCredentials)
  })

  describe('login', () => {
    it('should return access token on successful login', async () => {
      const mockResponse: IViettelSInvoiceLoginResponse = {
        access_token: 'mock_access_token',
        token_type: 'bearer',
        refresh_token: 'mock_refresh_token',
        expires_in: 298,
        scope: 'openid',
        iat: 1735098838,
        invoice_cluster: 'cluster10',
        type: 1,
        jti: '6b52a600-212b-4dc1-abd6-06f3b0f6dc52'
      }
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const result = await viettelSInvoice['login']()
      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith('https://api.example.com/auth/login', {
        username: 'test_user',
        password: 'test_password'
      })
    })

    it('should throw ViettelSInvoiceLoginException on error', async () => {
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Invalid credentials' }
        }
      })

      await expect(viettelSInvoice['login']()).rejects.toThrow(ViettelSInvoiceLoginException)
    })
  })

  describe('previewDraftInvoice', () => {
    it('should return draft invoice response on success', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockInvoice: IViettelSInvoice = {
        buyerInfo: {
          buyerName: 'xyz',
          buyerLegalName: 'abc',
          buyerTaxCode: '1801633969',
          buyerAddressLine: 'TEST ADDRESS',
          buyerPostalCode: '',
          buyerDistrictName: '',
          buyerCityName: '',
          buyerCountryCode: '',
          buyerPhoneNumber: '',
          buyerEmail: '',
          buyerBankName: '',
          buyerBankAccount: '',
          buyerCode: '',
          buyerNotGetInvoice: '',
          buyerBirthDay: ''
        },
        deliveryInfo: {},
        discountItemInfo: [],
        generalInvoiceInfo: {
          invoiceType: '01BLP',
          templateCode: '01BLP0-044',
          invoiceSeries: 'CV-24E',
          currencyCode: 'VND',
          exchangeRate: 1,
          paymentStatus: true,
          transactionUuid: '284c255b-b878-457c-ba40-ebc4c8d9dd3d'
        },
        itemInfo: [
          {
            lineNumber: 1,
            selection: 1,
            itemCode: '',
            itemName: 'Lệ phí ra, vào cảng, bến thủy nội địa',
            unitName: 'LƯỢT',
            unitPrice: 20000,
            quantity: 1,
            itemTotalAmountWithoutTax: 20000,
            itemTotalAmountAfterDiscount: 20000,
            taxPercentage: -2,
            taxAmount: 0,
            itemDiscount: 0,
            isIncreaseItem: null
          }
        ],
        payments: [
          {
            paymentMethod: '3',
            paymentMethodName: 'TM/CK'
          }
        ],
        sellerInfo: {
          sellerLegalName: 'TEST COMPANY NAME',
          sellerTaxCode: '',
          sellerAddressLine: 'TEST ADDRESS',
          sellerPhoneNumber: '',
          sellerFaxNumber: '',
          sellerEmail: '',
          sellerBankName: '',
          sellerBankAccount: '',
          sellerWebsite: ''
        },
        summarizeInfo: {
          sumOfTotalLineAmountWithoutTax: 20000,
          totalAmountWithoutTax: 20000,
          totalTaxAmount: 0,
          totalAmountWithTax: 22000
        },
        taxBreakdowns: [
          {
            taxPercentage: 10,
            taxableAmount: 0,
            taxAmount: 2000
          }
        ]
      }
      const mockResponse: IViettelSInvoiceDraftInvoicePreviewResponse = {
        errorCode: null,
        description: null,
        fileToBytes: 'mock file preview',
        paymentStatus: false,
        fileName: '0100109106-503.pdf'
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const result = await viettelSInvoice.previewDraftInvoice(mockInvoice)
      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/createInvoiceDraftPreview/test_user',
        mockInvoice,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock_access_token'
          }
        }
      )
    })

    it('should throw ViettelSInvoicePreviewDraftInvoiceException on error', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockInvoice: IViettelSInvoice = {
        buyerInfo: {
          buyerName: 'xyz',
          buyerLegalName: 'abc',
          buyerTaxCode: '1801633969',
          buyerAddressLine: 'TEST ADDRESS',
          buyerPostalCode: '',
          buyerDistrictName: '',
          buyerCityName: '',
          buyerCountryCode: '',
          buyerPhoneNumber: '',
          buyerEmail: '',
          buyerBankName: '',
          buyerBankAccount: '',
          buyerCode: '',
          buyerNotGetInvoice: '',
          buyerBirthDay: ''
        },
        deliveryInfo: {},
        discountItemInfo: [],
        generalInvoiceInfo: {
          invoiceType: '01BLP',
          templateCode: '01BLP0-044',
          invoiceSeries: 'CV-24E',
          currencyCode: 'VND',
          exchangeRate: 1,
          paymentStatus: true,
          transactionUuid: '284c255b-b878-457c-ba40-ebc4c8d9dd3d'
        },
        itemInfo: [
          {
            lineNumber: 1,
            selection: 1,
            itemCode: '',
            itemName: 'Lệ phí ra, vào cảng, bến thủy nội địa',
            unitName: 'LƯỢT',
            unitPrice: 20000,
            quantity: 1,
            itemTotalAmountWithoutTax: 20000,
            itemTotalAmountAfterDiscount: 20000,
            taxPercentage: -2,
            taxAmount: 0,
            itemDiscount: 0,
            isIncreaseItem: null
          }
        ],
        payments: [
          {
            paymentMethod: '3',
            paymentMethodName: 'TM/CK'
          }
        ],
        sellerInfo: {
          sellerLegalName: 'TEST COMPANY NAME',
          sellerTaxCode: '',
          sellerAddressLine: 'TEST ADDRESS',
          sellerPhoneNumber: '',
          sellerFaxNumber: '',
          sellerEmail: '',
          sellerBankName: '',
          sellerBankAccount: '',
          sellerWebsite: ''
        },
        summarizeInfo: {
          sumOfTotalLineAmountWithoutTax: 20000,
          totalAmountWithoutTax: 20000,
          totalTaxAmount: 0,
          totalAmountWithTax: 22000
        },
        taxBreakdowns: [
          {
            taxPercentage: 10,
            taxableAmount: 0,
            taxAmount: 2000
          }
        ]
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Error creating draft preview' }
        }
      })

      await expect(viettelSInvoice.previewDraftInvoice(mockInvoice)).rejects.toThrow(
        ViettelSInvoicePreviewDraftInvoiceException
      )
    })
  })

  describe('createInvoice', () => {
    it('should return invoice response on success', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockInvoice: IViettelSInvoice = {
        buyerInfo: {
          buyerName: 'xyz',
          buyerLegalName: 'abc',
          buyerTaxCode: '1801633969',
          buyerAddressLine: 'TEST ADDRESS',
          buyerPostalCode: '',
          buyerDistrictName: '',
          buyerCityName: '',
          buyerCountryCode: '',
          buyerPhoneNumber: '',
          buyerEmail: '',
          buyerBankName: '',
          buyerBankAccount: '',
          buyerCode: '',
          buyerNotGetInvoice: '',
          buyerBirthDay: ''
        },
        deliveryInfo: {},
        discountItemInfo: [],
        generalInvoiceInfo: {
          invoiceType: '01BLP',
          templateCode: '01BLP0-044',
          invoiceSeries: 'CV-24E',
          currencyCode: 'VND',
          exchangeRate: 1,
          paymentStatus: true,
          transactionUuid: '284c255b-b878-457c-ba40-ebc4c8d9dd3d'
        },
        itemInfo: [
          {
            lineNumber: 1,
            selection: 1,
            itemCode: '',
            itemName: 'Lệ phí ra, vào cảng, bến thủy nội địa',
            unitName: 'LƯỢT',
            unitPrice: 20000,
            quantity: 1,
            itemTotalAmountWithoutTax: 20000,
            itemTotalAmountAfterDiscount: 20000,
            taxPercentage: -2,
            taxAmount: 0,
            itemDiscount: 0,
            isIncreaseItem: null
          }
        ],
        payments: [
          {
            paymentMethod: '3',
            paymentMethodName: 'TM/CK'
          }
        ],
        sellerInfo: {
          sellerLegalName: 'TEST COMPANY NAME',
          sellerTaxCode: '',
          sellerAddressLine: 'TEST ADDRESS',
          sellerPhoneNumber: '',
          sellerFaxNumber: '',
          sellerEmail: '',
          sellerBankName: '',
          sellerBankAccount: '',
          sellerWebsite: ''
        },
        summarizeInfo: {
          sumOfTotalLineAmountWithoutTax: 20000,
          totalAmountWithoutTax: 20000,
          totalTaxAmount: 0,
          totalAmountWithTax: 22000
        },
        taxBreakdowns: [
          {
            taxPercentage: 10,
            taxableAmount: 0,
            taxAmount: 2000
          }
        ]
      }
      const mockResponse: IViettelSInvoiceResponse = {
        description: 'mock_description',
        errorCode: null,
        result: {
          supplierTaxCode: 'mock_tax_code',
          invoiceNo: 'mock_invoice_no',
          transactionID: 'mock_transaction_id',
          reservationCode: 'mock_reservation_code',
          codeOfTax: 'mock code of tax'
        }
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const result = await viettelSInvoice.createInvoice(mockInvoice)
      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/createInvoice/test_user',
        mockInvoice,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock_access_token'
          }
        }
      )
    })

    it('should throw ViettelSInvoiceCreateInvoiceException on error', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockInvoice: IViettelSInvoice = {
        buyerInfo: {
          buyerName: 'xyz',
          buyerLegalName: 'abc',
          buyerTaxCode: '1801633969',
          buyerAddressLine: 'TEST ADDRESS',
          buyerPostalCode: '',
          buyerDistrictName: '',
          buyerCityName: '',
          buyerCountryCode: '',
          buyerPhoneNumber: '',
          buyerEmail: '',
          buyerBankName: '',
          buyerBankAccount: '',
          buyerCode: '',
          buyerNotGetInvoice: '',
          buyerBirthDay: ''
        },
        deliveryInfo: {},
        discountItemInfo: [],
        generalInvoiceInfo: {
          invoiceType: '01BLP',
          templateCode: '01BLP0-044',
          invoiceSeries: 'CV-24E',
          currencyCode: 'VND',
          exchangeRate: 1,
          paymentStatus: true,
          transactionUuid: '284c255b-b878-457c-ba40-ebc4c8d9dd3d'
        },
        itemInfo: [
          {
            lineNumber: 1,
            selection: 1,
            itemCode: '',
            itemName: 'Lệ phí ra, vào cảng, bến thủy nội địa',
            unitName: 'LƯỢT',
            unitPrice: 20000,
            quantity: 1,
            itemTotalAmountWithoutTax: 20000,
            itemTotalAmountAfterDiscount: 20000,
            taxPercentage: -2,
            taxAmount: 0,
            itemDiscount: 0,
            isIncreaseItem: null
          }
        ],
        payments: [
          {
            paymentMethod: '3',
            paymentMethodName: 'TM/CK'
          }
        ],
        sellerInfo: {
          sellerLegalName: 'TEST COMPANY NAME',
          sellerTaxCode: '',
          sellerAddressLine: 'TEST ADDRESS',
          sellerPhoneNumber: '',
          sellerFaxNumber: '',
          sellerEmail: '',
          sellerBankName: '',
          sellerBankAccount: '',
          sellerWebsite: ''
        },
        summarizeInfo: {
          sumOfTotalLineAmountWithoutTax: 20000,
          totalAmountWithoutTax: 20000,
          totalTaxAmount: 0,
          totalAmountWithTax: 22000
        },
        taxBreakdowns: [
          {
            taxPercentage: 10,
            taxableAmount: 0,
            taxAmount: 2000
          }
        ]
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Error creating invoice' }
        }
      })

      await expect(viettelSInvoice.createInvoice(mockInvoice)).rejects.toThrow(ViettelSInvoiceCreateInvoiceException)
    })
  })

  describe('getInvoiceByTransactionUuid', () => {
    it('should return invoice detail response on success', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockResponse: IViettelSInvoiceDetailResponse = {
        transactionUuid: 'mock_transaction_uuid',
        errorCode: 'mock_error_code',
        description: 'mock_description',
        result: [
          {
            supplierTaxCode: 'mock_supplier_tax_code',
            invoiceNo: 'mock_invoice_no',
            reservationCode: 'mock_reservation_code',
            issueDate: 2134234,
            status: 'mock_status'
          }
        ]
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const transactionUuid = 'mock_transaction_uuid'
      const result = await viettelSInvoice.getInvoiceByTransactionUuid(transactionUuid)

      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/searchInvoiceByTransactionUuid',
        new URLSearchParams({
          supplierTaxCode: 'test_user',
          transactionUuid
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: 'Bearer mock_access_token'
          }
        }
      )
    })

    it('should throw ViettelSInvoiceGetInvoiceException on error', async () => {
      const mockToken = { access_token: 'mock_access_token' }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Error retrieving invoice' }
        }
      })

      await expect(viettelSInvoice.getInvoiceByTransactionUuid('mock_transaction_uuid')).rejects.toThrow(
        ViettelSInvoiceGetInvoiceException
      )
    })
  })

  describe('getInvoicesByDateRange', () => {
    it('should return a list of invoices on success', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockResponse: IViettelSInvoiceDetailsResponse = {
        errorCode: null,
        description: null,
        totalRows: 561,
        invoices: [
          {
            invoiceId: 211621188,
            invoiceType: '1',
            adjustmentType: '1',
            templateCode: '1C23DONGHK',
            invoiceSeri: 'C24MXD',
            invoiceNumber: '0327283',
            invoiceNo: 'C24MXD327283',
            currency: 'VND',
            total: 1995820,
            issueDate: 1734887195000,
            issueDateStr: null,
            state: 1,
            requestDate: null,
            description: null,
            buyerIdNo: null,
            stateCode: 1,
            subscriberNumber: null,
            paymentStatus: 1,
            viewStatus: null,
            downloadStatus: null,
            exchangeStatus: 0,
            numOfExchange: null,
            createTime: 1734887196000,
            contractId: null,
            contractNo: null,
            supplierTaxCode: '0100109106-503',
            buyerTaxCode: '',
            totalBeforeTax: 1814382,
            taxAmount: 181438,
            taxRate: null,
            paymentMethod: '5',
            paymentTime: null,
            customerId: null,
            no: null,
            paymentStatusName: 'Đã thanh toán',
            buyerName: 'Bán lẻ',
            transactionUuid: '122224_2_117370',
            originalInvoiceId: null
          }
        ]
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const fromDate = '01/01/2023'
      const toDate = '24/12/2024'
      const result = await viettelSInvoice.getInvoicesByDateRange(fromDate, toDate)

      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getListInvoiceDataControl',
        {
          supplierTaxCode: 'test_user',
          fromDate,
          toDate
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock_access_token'
          }
        }
      )
    })

    it('should throw ViettelSInvoiceGetInvoicesException for invalid date format', async () => {
      await expect(viettelSInvoice.getInvoicesByDateRange('invalid_date', '24/12/2024')).rejects.toThrow(
        ViettelSInvoiceGetInvoicesException
      )
    })

    it('should throw ViettelSInvoiceGetInvoicesException on error', async () => {
      const mockToken = { access_token: 'mock_access_token' }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Error retrieving invoices' }
        }
      })

      await expect(viettelSInvoice.getInvoicesByDateRange('01/01/2023', '24/12/2024')).rejects.toThrow(
        ViettelSInvoiceGetInvoicesException
      )
    })
  })

  describe('getInvoiceFile', () => {
    it('should return invoice file response on success', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockResponse: IViettelSInvoiceGetFileResponse = {
        errorCode: 200,
        description: null,
        fileToBytes: 'mock_file_to_byte',
        paymentStatus: true,
        fileName: '0100109106-503-CV-24E0000032.pdf'
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const params: GetInvoiceFileParams = {
        invoiceNo: 'INV123',
        templateCode: 'TEMPLATE456',
        fileType: 'PDF'
      }
      const result = await viettelSInvoice.getInvoiceFile(params)

      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getInvoiceRepresentationFile',
        {
          supplierTaxCode: 'test_user',
          ...params
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock_access_token'
          }
        }
      )
    })

    it('should throw ViettelSInvoiceGetInvoiceFileException on error', async () => {
      const mockToken = { access_token: 'mock_access_token' }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Error retrieving invoice file' }
        }
      })

      const params: GetInvoiceFileParams = {
        invoiceNo: 'INV123',
        templateCode: 'TEMPLATE456',
        fileType: 'PDF'
      }
      await expect(viettelSInvoice.getInvoiceFile(params)).rejects.toThrow(ViettelSInvoiceGetInvoiceFileException)
    })
  })

  describe('getInvoiceTemplates', () => {
    it('should return a list of invoice templates on success', async () => {
      const mockToken = { access_token: 'mock_access_token' }
      const mockResponse: IViettelSInvoiceGetTemplatesResponse = {
        errorCode: null,
        description: null,
        totalRows: 5,
        template: [
          {
            templateCode: '01BLP0/HNT1',
            invoiceSeri: 'AB/23E',
            originalTemplateCode: '01BLP/0010',
            taxPolicy: '0'
          },
          {
            templateCode: '01BLP0/HNT2',
            invoiceSeri: 'AB/23E',
            originalTemplateCode: '01BLP/0010',
            taxPolicy: '0'
          },
          {
            templateCode: '01BLP0-003',
            invoiceSeri: 'AB-23E',
            originalTemplateCode: '01BLP/0010',
            taxPolicy: '0'
          },
          {
            templateCode: '01BLP0-003',
            invoiceSeri: '01AB-24P',
            originalTemplateCode: '01BLP/0010',
            taxPolicy: '0'
          },
          {
            templateCode: '01BLP0-044',
            invoiceSeri: 'CV-24E',
            originalTemplateCode: '01BLP/0010',
            taxPolicy: '0'
          }
        ]
      }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockResolvedValueOnce({ data: mockResponse })

      const invoiceType = '01BLP'
      const result = await viettelSInvoice.getInvoiceTemplates(invoiceType)

      console.log('check result from getInvoiceTemplates', result)

      expect(result).toEqual(mockResponse)
      expect(mockAxios.post).toHaveBeenCalledWith(
        'https://api.example.com/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getInvoiceTemplates',
        {
          taxCode: 'test_user',
          invoiceType
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock_access_token'
          }
        }
      )
    })

    it('should throw ViettelSInvoiceGetTemplatesException on error', async () => {
      const mockToken = { access_token: 'mock_access_token' }

      jest.spyOn(viettelSInvoice as any, 'login').mockResolvedValueOnce(mockToken)
      mockAxios.post.mockRejectedValueOnce({
        response: {
          data: { message: 'Error retrieving invoice templates' }
        }
      })

      await expect(viettelSInvoice.getInvoiceTemplates('01BLP')).rejects.toThrow(ViettelSInvoiceGetTemplatesException)
    })
  })
})
