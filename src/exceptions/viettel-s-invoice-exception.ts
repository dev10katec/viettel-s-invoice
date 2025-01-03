class ViettelSInvoiceException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoiceException
