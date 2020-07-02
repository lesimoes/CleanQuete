import bcrypt, { hash } from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapater'

const SALT = 12;

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('lelehash'))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(SALT);
}

describe('BCrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT);
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');

    expect(hash).toBe('lelehash');
  })

  test('Should throw if bcryp throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.encrypt('any_value');

    await expect(promise).rejects.toThrow();
  })
});