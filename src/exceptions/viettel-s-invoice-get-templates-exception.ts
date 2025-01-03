class ViettelSInvoiceGetTemplatesException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceGetTemplatesException'
    this.originalError = originalError
  }
}

export default ViettelSInvoiceGetTemplatesException
