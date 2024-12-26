class ViettelSInvoiceGetInvoiceException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceGetInvoiceException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoiceGetInvoiceException
