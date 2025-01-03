# Viettel S Invoice API Integration

> [!NOTE]
> This is an `UNOFFICIAL` project. It is not affiliated with or endorsed by Viettel.

This project provides a class `ViettelSInvoice` that allows interaction with the Viettel S Invoice API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Preview Draft Invoice](#preview-draft-invoice)
  - [Create Invoice](#create-invoice)
  - [Get Invoice by Transaction UUID](#get-invoice-by-transaction-uuid)
  - [Get Invoices by Date Range](#get-invoices-by-date-range)
  - [Get Invoice File](#get-invoice-file)
  - [Get Invoice Templates](#get-invoice-templates)
- [Exceptions](#exceptions)
- [License](#license)

## Prerequisites

Before using the Viettel S Invoice API, you will need:

- An active Viettel S Invoice account with a valid username and password.
- An API endpoint URL to connect to the Viettel S Invoice API.
- A basic understanding of how to interact with APIs.

## Installation

```BASH
npm install --save viettel-s-invoice
```

## Usage

```JS
const viettelSInvoice = new ViettelSInvoice({
  username: 'your-username', // required
  password: 'your-password', // required
  apiEndPoint: 'https://api.viettel.vn', // optional
});
```

### Preview Draft Invoice

To preview a draft invoice, use the `previewDraftInvoice` method:

```JS
viettelSInvoice.previewDraftInvoice(invoice)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

- invoice: The draft invoice data to preview.

### Create Invoice

To create an invoice, use the `createInvoice` method:

```JS
viettelSInvoice.createInvoice(invoice)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

- invoice: The data for creating the invoice.

### Get Invoice by Transaction UUID

To retrieve an invoice by its transaction UUID, use the `getInvoiceByTransactionUuid` method:

```JS
const transactionUuid = '7a9f9e2a-d28f-4bef-a9d0-d91607453f70';

viettelSInvoice.getInvoiceByTransactionUuid(transactionUuid)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

- transactionUuid: The unique identifier of the transaction associated with the invoice.

### Get Invoices by Date Range

To get invoices within a specified date range, use the `getInvoicesByDateRange` method:

```JS
const fromDate = '01/01/2024';
const toDate = '31/01/2024';

viettelSInvoice.getInvoicesByDateRange(fromDate, toDate)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

- fromDate: The start date of the range (format: DD/MM/YYYY).
- toDate: The end date of the range (format: DD/MM/YYYY).

### Get Invoice File

- To retrieve an invoice file, use the getInvoiceFile method:

```JS
viettelSInvoice.getInvoiceFile({ invoiceNo, templateCode, fileType })
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

- invoiceNo: The invoice number.
- templateCode: The template code for the invoice.
- fileType: The file type (e.g., PDF, ZIP).

### Get Invoice Templates

- To retrieve invoice templates code, use the getInvoiceTemplates method:

```JS
const invoiceType = '01BLP'

viettelSInvoice.getInvoiceTemplates(invoiceType)
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

## Exceptions

The following exceptions are handled by the ViettelSInvoice class:

- ViettelSInvoiceLoginException: Thrown if login fails.
- ViettelSInvoiceCreateInvoiceException: Thrown if invoice creation fails.
- ViettelSInvoicePreviewDraftInvoiceException: Thrown if reviewing a draft invoice fails.
- ViettelSInvoiceGetInvoiceException: Thrown if retrieving an invoice fails.
- ViettelSInvoiceGetInvoicesException: Thrown if retrieving invoices by date range fails.
- ViettelSInvoiceGetInvoiceFileException: Thrown if retrieving an invoice file fails.
- ViettelSInvoiceGetTemplatesException: thrown if retrieving invoice templates fails
- Each exception includes a descriptive error message.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
