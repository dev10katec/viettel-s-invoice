import {
  IViettelSInvoiceDraftInvoicePreviewResponse,
  IViettelSInvoice,
  IViettelSInvoiceConfiguration,
  IViettelSInvoiceDetailResponse,
  IViettelSInvoiceDetailsResponse,
  IViettelSInvoiceGetFileResponse,
  IViettelSInvoiceLoginResponse,
  IViettelSInvoiceResponse,
  IViettelSInvoiceGetTemplatesResponse
} from './interfaces/viettel-s-invoice'
import { API_ENDPOINT } from './constants'
import axios from 'axios'
import { GetInvoiceFileParams } from './types'
import {
  ViettelSInvoiceLoginException,
  ViettelSInvoiceCreateInvoiceException,
  ViettelSInvoiceException,
  ViettelSInvoiceGetInvoiceException,
  ViettelSInvoiceGetInvoiceFileException,
  ViettelSInvoiceGetInvoicesException,
  ViettelSInvoicePreviewDraftInvoiceException,
  ViettelSInvoiceGetTemplatesException
} from './exceptions'

class ViettelSInvoice {
  private readonly username: string
  private readonly password: string
  private readonly apiEndPoint: string

  constructor({ apiEndPoint, username, password }: IViettelSInvoiceConfiguration) {
    this.apiEndPoint = apiEndPoint || API_ENDPOINT
    this.username = username
    this.password = password

    if (!this.username || !this.password) {
      throw new ViettelSInvoiceException('Username or password is required')
    }
    if (apiEndPoint && !this.isValidUrl(apiEndPoint)) {
      throw new ViettelSInvoiceException('API endpoint is not valid')
    }
  }

  private isValidUrl(url: string): boolean {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/
    return pattern.test(url)
  }

  private validateDate(date: string): boolean {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    return dateRegex.test(date)
  }

  private getApiUrl(path: string): string {
    return `${this.apiEndPoint}${path}`
  }

  private async login(): Promise<IViettelSInvoiceLoginResponse> {
    try {
      const { data } = await axios.post<IViettelSInvoiceLoginResponse>(this.getApiUrl('/auth/login'), {
        username: this.username,
        password: this.password
      })
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoiceLoginException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoiceLoginException(`Unexpected error: ${(error as Error).message}`, error)
    }
  }

  /**
   * Previews a draft invoice by sending the invoice data to the server.
   *
   * @param invoice - The invoice data to be previewed.
   * @returns A promise that resolves to the draft invoice response.
   * @throws ReviewDraftInvoiceException if the server response is not successful.
   */
  public async previewDraftInvoice(invoice: IViettelSInvoice): Promise<IViettelSInvoiceDraftInvoicePreviewResponse> {
    const { access_token } = await this.login()

    try {
      const { data } = await axios.post<IViettelSInvoiceDraftInvoicePreviewResponse>(
        this.getApiUrl(
          `/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/createInvoiceDraftPreview/${this.username}`
        ),
        invoice,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoicePreviewDraftInvoiceException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoicePreviewDraftInvoiceException(`Unexpected error: ${(error as Error).message}`)
    }
  }

  /**
   * Creates an invoice by sending the provided invoice data to the server.
   *
   * @param invoice - The invoice data to be created.
   * @returns A promise that resolves to the invoice response.
   * @throws ViettelSInvoiceCreateInvoiceException if the server response is not successful.
   */
  public async createInvoice(invoice: IViettelSInvoice): Promise<IViettelSInvoiceResponse> {
    const { access_token } = await this.login()

    try {
      const { data } = await axios.post<IViettelSInvoiceResponse>(
        this.getApiUrl(`/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/createInvoice/${this.username}`),
        invoice,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoiceCreateInvoiceException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoiceCreateInvoiceException(`Unexpected error: ${(error as Error).message}`, error)
    }
  }

  /**
   * Retrieves an invoice by its transaction UUID.
   *
   * @param transactionUuid - The unique identifier for the transaction.
   * @returns A promise that resolves to the invoice detail response.
   * @throws ViettelSInvoiceGetInvoiceException if the server response is not successful.
   */
  public async getInvoiceByTransactionUuid(transactionUuid: string): Promise<IViettelSInvoiceDetailResponse> {
    const { access_token } = await this.login()
    const buildDataToSend = new URLSearchParams({
      supplierTaxCode: this.username,
      transactionUuid
    })

    try {
      const { data } = await axios.post<IViettelSInvoiceDetailResponse>(
        this.getApiUrl('/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/searchInvoiceByTransactionUuid'),
        buildDataToSend,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoiceGetInvoiceException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoiceGetInvoiceException(`Unexpected error: ${(error as Error).message}`, error)
    }
  }

  /**
   * Retrieves a list of invoices within a specified date range.
   *
   * @param fromDate - The start date of the range in 'dd/MM/yyyy' format.
   * @param toDate - The end date of the range in 'dd/MM/yyyy' format.
   * @returns A promise that resolves to the invoice detail response.
   * @throws ViettelSInvoiceGetInvoicesException if the date format is invalid or the server response is not successful.
   */
  public async getInvoicesByDateRange(fromDate: string, toDate: string): Promise<IViettelSInvoiceDetailsResponse> {
    if (!this.validateDate(fromDate) || !this.validateDate(toDate)) {
      throw new ViettelSInvoiceGetInvoicesException('Invalid date format: dd/MM/yyyy')
    }
    const { access_token } = await this.login()

    try {
      const { data } = await axios.post<IViettelSInvoiceDetailsResponse>(
        this.getApiUrl('/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getListInvoiceDataControl'),
        {
          supplierTaxCode: this.username,
          fromDate,
          toDate
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoiceGetInvoicesException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoiceGetInvoicesException(`Unexpected error: ${(error as Error).message}`, error)
    }
  }

  /**
   * Retrieves the file representation of an invoice based on the provided parameters.
   *
   * @param invoiceNo - The invoice number to identify the invoice.
   * @param templateCode - The template code associated with the invoice.
   * @param fileType - The type of file to retrieve (PDF, ZIP).
   * @returns A promise that resolves to the invoice file response.
   * @throws ViettelSInvoiceGetInvoiceFileException if the server response is not successful.
   */
  async getInvoiceFile({
    invoiceNo,
    templateCode,
    fileType
  }: GetInvoiceFileParams): Promise<IViettelSInvoiceGetFileResponse> {
    const { access_token } = await this.login()

    try {
      const { data } = await axios.post<IViettelSInvoiceGetFileResponse>(
        this.getApiUrl('/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getInvoiceRepresentationFile'),
        {
          supplierTaxCode: this.username,
          invoiceNo,
          templateCode,
          fileType
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoiceGetInvoiceFileException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoiceGetInvoiceFileException(`Unexpected error: ${(error as Error).message}`, error)
    }
  }

  /**
   * Retrieves available invoice templates for a specified invoice type.
   *
   * @param invoiceType - The type of invoice for which templates are requested.
   * @returns A promise that resolves to the response containing invoice templates.
   * @throws ViettelSInvoiceGetTemplatesException if the server response is not successful.
   */
  async getInvoiceTemplates(invoiceType: string): Promise<IViettelSInvoiceGetTemplatesResponse> {
    const { access_token } = await this.login()

    try {
      const { data } = await axios.post<IViettelSInvoiceGetTemplatesResponse>(
        this.getApiUrl('/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getInvoiceTemplates'),
        {
          taxCode: this.username,
          invoiceType
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ViettelSInvoiceGetTemplatesException(error.message, error?.response?.data)
      }
      throw new ViettelSInvoiceGetTemplatesException(`Unexpected error: ${(error as Error).message}`, error)
    }
  }
}

export default ViettelSInvoice
