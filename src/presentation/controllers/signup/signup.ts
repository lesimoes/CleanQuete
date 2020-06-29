import { badRequest, serverError, okResponse } from '../../helper/http-helper';
import { MissingParamError, InvalidParamError } from '../../erros';
import { 
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
  AddAccount
} from './signup-protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;  
    this.addAccount = addAccount;
  }

  async handle (httRequest: HttpRequest): Promise<HttpResponse> {

    try {

      const { name, email, password, passwordConfirmation} = httRequest.body;

      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        name,
        email,
        password,
      })
      return okResponse(account); 
    } catch (error) {
      return serverError();
    }
  }
}