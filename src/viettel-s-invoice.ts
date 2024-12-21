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
    const response = await fetch(this.getApiUrl("/auth/login"), {
      method: "POST",
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new LoginException(`Login failed: ${message}`);
    }
    return (await response.json()) as IViettelSInvoiceLoginResponse;
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

    const response = await fetch(
      this.getApiUrl(
        `/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/createInvoiceDraftPreview/${this.username}`
      ),
      {
        method: "POST",
        body: JSON.stringify(invoice),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    if (!response.ok) {
      const message = await response.text();
      throw new ReviewDraftInvoiceException(
        `Review draft invoice failed: ${message}`
      );
    }

    return (await response.json()) as IDraftInvoiceResponse;
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

    const response = await fetch(
      this.getApiUrl(
        `/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/createInvoice/${this.username}`
      ),
      {
        method: "POST",
        body: JSON.stringify(invoice),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new CreateInvoiceException(`Create invoice failed: ${message}`);
    }
    return (await response.json()) as IViettelSInvoiceResponse;
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
    const buildDataToSend: string = new URLSearchParams({
      supplierTaxCode: this.username,
      transactionUuid,
    }).toString();

    const response = await fetch(
      this.getApiUrl(
        "/services/einvoiceapplication/api/InvoiceAPI/InvoiceWS/searchInvoiceByTransactionUuid"
      ),
      {
        method: "POST",
        body: buildDataToSend,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new GetInvoiceException(`Get invoice failed: ${message}`);
    }

    return (await response.json()) as IViettelSInvoiceDetailResponse;
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
    const response = await fetch(
      this.getApiUrl(
        "/services/einvoiceapplication/api/InvoiceAPI/InvoiceUtilsWS/getListInvoiceDataControl"
      ),
      {
        method: "POST",
        body: JSON.stringify({
          supplierTaxCode: this.username,
          fromDate,
          toDate,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      const message = await response.text();
      throw new GetInvoicesException(`Get invoices failed: ${message}`);
    }

    return (await response.json()) as IViettelSInvoiceDetailResponse;
  }
}

export default ViettelSInvoice;
