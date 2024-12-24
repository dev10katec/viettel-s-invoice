class LoginException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ViettelEInvoiceLoginException'
    this.message = message
  }
}

export default LoginException
