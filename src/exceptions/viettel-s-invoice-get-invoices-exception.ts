class ViettelSInvoiceGetInvoicesException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceGetInvoicesException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoiceGetInvoicesException
