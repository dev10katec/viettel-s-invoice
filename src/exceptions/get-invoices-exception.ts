class GetInvoicesException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GetInvoicesException'
    this.message = message
  }
}

export default GetInvoicesException
