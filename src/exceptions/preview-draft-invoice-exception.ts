class PreviewDraftInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PreviewDraftInvoiceException'
    this.message = message
  }
}

export default PreviewDraftInvoiceException
