import {
  IDraftInvoiceResponse,
  IInvoice,
  IViettelSInvoice,
  IViettelSInvoiceDetailResponse,
  IViettelSInvoiceLoginResponse,
  IViettelSInvoiceResponse,
} from "./interfaces/viettel-s-invoice";
import LoginException from "./exceptions/login-exception";
import CreateInvoiceException from "./exceptions/create-invoice-exception";
import GetInvoicesException from "./exceptions/get-invoices-exception";
import { API_ENDPOINT } from "./constants";
import ViettelSInvoiceException from "./exceptions/viettel-s-invoice-exception";
import ReviewDraftInvoiceException from "./exceptions/review-draft-invoice-exception";
import GetInvoiceException from "./exceptions/get-invoice-exception";
import axios from "axios";

class ViettelSInvoice {
  private username: string;
  private password: string;
  private apiEndPoint: string;

  constructor({ apiEndPoint, username, password }: IViettelSInvoice) {
    this.apiEndPoint = apiEndPoint || API_ENDPOINT;
    this.username = username;
    this.password = password;

    if (!this.username || !this.password) {
      throw new ViettelSInvoiceException("Username or password is required");
    }
  }

  private validateDate(date: string): boolean {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(date);
  }

  private getApiUrl(path: string): string {
    return `${this.apiEndPoint}${path}`;
  }

  private async login(): Promise<IViettelSInvoiceLoginResponse> {
    try {
      const response = await axios.post(this.getApiUrl("/auth/login"), {
        username: this.username,
        password: this.password,
      });
      return response.data as IViettelSInvoiceLoginResponse;
    } catch (error) {
      throw new LoginException(`Login failed: ${(<Error>error).message}`);
    }
  }

  /**
   * Previews a draft invoice by sending the invoice data to the server.
   *
   * @param invoice - The invoice data to be previewed.
   * @returns A promise that resolves to the draft invoice response.
   * @throws ReviewDraftInvoiceException if the server response is not successful.
   */
  public async previewDraftInvoice(
    invoice: IInvoice
  ): Promise<IDraftInvoiceResponse> {
    const { access_token } = await this.login();

    try {
      const response = await axios.post(
        this.getApiUrl(
          `/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/createInvoiceDraftPreview/${this.username}`
        ),
        invoice,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data as IDraftInvoiceResponse;
    } catch (error) {
      throw new ReviewDraftInvoiceException(
        `Review draft invoice failed: ${(<Error>error).message}`
      );
    }
  }

  /**
   * Creates an invoice by sending the provided invoice data to the server.
   *
   * @param invoice - The invoice data to be created.
   * @returns A promise that resolves to the invoice response.
   * @throws CreateInvoiceException if the server response is not successful.
   */
  public async createInvoice(
    invoice: IInvoice
  ): Promise<IViettelSInvoiceResponse> {
    const { access_token } = await this.login();

    try {
      const response = await axios.post(
        this.getApiUrl(
          `/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/createInvoice/${this.username}`
        ),
        invoice,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data as IViettelSInvoiceResponse;
    } catch (error) {
      throw new CreateInvoiceException(
        `Create invoice failed: ${(<Error>error).message}`
      );
    }
  }

  /**
   * Retrieves an invoice by its transaction UUID.
   *
   * @param transactionUuid - The unique identifier for the transaction.
   * @returns A promise that resolves to the invoice detail response.
   * @throws GetInvoiceException if the server response is not successful.
   */
  public async getInvoiceByTransactionUuid(
    transactionUuid: string
  ): Promise<IViettelSInvoiceDetailResponse> {
    const { access_token } = await this.login();
    const buildDataToSend = new URLSearchParams({
      supplierTaxCode: this.username,
      transactionUuid,
    });

    try {
      const response = await axios.post(
        this.getApiUrl(
          "/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/searchInvoiceByTransactionUuid"
        ),
        buildDataToSend,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data as IViettelSInvoiceDetailResponse;
    } catch (error) {
      throw new GetInvoiceException(
        `Get invoice failed: ${(<Error>error).message}`
      );
    }
  }

  /**
   * Retrieves a list of invoices within a specified date range.
   *
   * @param fromDate - The start date of the range in 'dd/MM/yyyy' format.
   * @param toDate - The end date of the range in 'dd/MM/yyyy' format.
   * @returns A promise that resolves to the invoice detail response.
   * @throws GetInvoicesException if the date format is invalid or the server response is not successful.
   */
  public async getInvoicesByDateRange(fromDate: string, toDate: string) {
    if (!this.validateDate(fromDate) || !this.validateDate(toDate)) {
      throw new GetInvoicesException("Invalid date format");
    }
    const { access_token } = await this.login();

    try {
      const response = await axios.post(
        this.getApiUrl(
          "/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getListInvoiceDataControl"
        ),
        {
          supplierTaxCode: this.username,
          fromDate,
          toDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      return response.data as IViettelSInvoiceDetailResponse;
    } catch (error) {
      throw new GetInvoicesException(
        `Get invoices failed: ${(<Error>error).message}`
      );
    }
  }
}

export default ViettelSInvoice;
