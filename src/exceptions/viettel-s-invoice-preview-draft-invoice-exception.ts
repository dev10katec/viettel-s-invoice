class ViettelSInvoicePreviewDraftInvoiceException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoicePreviewDraftInvoiceException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoicePreviewDraftInvoiceException
