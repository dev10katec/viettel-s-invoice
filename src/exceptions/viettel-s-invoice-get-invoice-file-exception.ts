class ViettelSInvoiceGetInvoiceFileException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceGetInvoiceFileException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoiceGetInvoiceFileException
