class ViettelSInvoiceLoginException extends Error {
  public originalError: unknown

  constructor(message: string, originalError?: unknown) {
    super(message)
    this.name = 'ViettelSInvoiceLoginException'
    this.message = message
    this.originalError = originalError
  }
}

export default ViettelSInvoiceLoginException
