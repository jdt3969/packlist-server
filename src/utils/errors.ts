export function NotFoundError() {
  return new Error('Not Found');
}

export function NotAuthorizedError() {
  return new Error('You do not have access');
}

export function InvalidCredentialsError() {
  return new Error('Email or password was incorrect');
}
