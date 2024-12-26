class ViettelSInvoiceCreateInvoiceException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceCreateInvoiceException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoiceCreateInvoiceException
