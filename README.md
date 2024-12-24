# ViettelSInvoice API Integration

Note: This is an unofficial project. It is not affiliated with or endorsed by Viettel.
This project provides a class `ViettelSInvoice` that allows interaction with the ViettelS Invoice API.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Preview Draft Invoice](#preview-draft-invoice)
  - [Create Invoice](#create-invoice)
  - [Get Invoice by Transaction UUID](#get-invoice-by-transaction-uuid)
  - [Get Invoices by Date Range](#get-invoices-by-date-range)
  - [Get Invoice File](#get-invoice-file)
- [Exceptions](#exceptions)
- [License](#license)

## Prerequisites

Before using the ViettelSInvoice API, you will need:

- An active ViettelS Invoice account with a valid username and password.
- An API endpoint URL to connect to the ViettelS Invoice API.
- A basic understanding of how to interact with APIs.

## Installation

```BASH
npm install viettel-s-invoice
```

## Usage

```JS
const viettelSInvoice = new ViettelSInvoice({
  username: 'your-username',
  password: 'your-password',
  apiEndPoint: 'https://api.viettel.vn',
});
```

### Preview Draft Invoice

```JS
viettelSInvoice.previewDraftInvoice(invoice)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Create Invoice

```JS
viettelSInvoice.createInvoice(invoice)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Get Invoice by Transaction UUID

```JS
const transactionUuid = 'your-transaction-uuid';

viettelSInvoice.getInvoiceByTransactionUuid(transactionUuid)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Get Invoices by Date Range

```JS
const fromDate = '01/01/2024';
const toDate = '31/01/2024';

viettelSInvoice.getInvoicesByDateRange(fromDate, toDate)
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

### Get Invoice File

```JS
viettelSInvoice.getInvoiceFile({ invoiceNo, templateCode, fileType })
  .then(response => console.log(response))
  .catch(error => console.log(error))
```

## Exceptions

The following exceptions are handled by the ViettelSInvoice class:

- LoginException: Thrown if login fails.
- CreateInvoiceException: Thrown if invoice creation fails.
- ReviewDraftInvoiceException: Thrown if reviewing a draft invoice fails.
- GetInvoiceException: Thrown if retrieving an invoice fails.
- GetInvoicesException: Thrown if retrieving invoices by date range fails.
- GetInvoiceFileException: Thrown if retrieving an invoice file fails.
- Each exception includes a descriptive error message.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
