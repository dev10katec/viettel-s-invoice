class ViettelSInvoiceException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ViettelSInvoiceException'
  }
}

export default ViettelSInvoiceException
