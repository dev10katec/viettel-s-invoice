class LoginException extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ViettelEInvoiceLoginException'
  }
}

export default LoginException
