function genError(title: string, description?: string) {
  return new Error(title + (description ? ': ' + description : ''));
}

export function NotFoundError(msg?: string) {
  return genError('Not Found', msg);
}

export function NotAuthorizedError(msg?: string) {
  return genError('You do not have access', msg);
}

export function InvalidCredentialsError(msg?: string) {
  return genError('Email or password was incorrect', msg);
}
