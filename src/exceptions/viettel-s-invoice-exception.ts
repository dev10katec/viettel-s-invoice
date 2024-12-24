class ViettelSInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ViettelSInvoiceException'
    this.message = message
  }
}

export default ViettelSInvoiceException
