class ReviewDraftInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReviewDraftInvoiceException'
  }
}

export default ReviewDraftInvoiceException
