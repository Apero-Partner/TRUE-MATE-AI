export class HttpCodeError {
  static readonly REQUEST_ERRORS: any = {
    '400': {
      statusCode: 'BAD_REQUEST',
      name: 'BadRequest',
      message: 'Bad request.',
    },
    '401': {
      statusCode: 'UNAUTHORIZED',
      name: 'Unauthorized',
      message: 'No authorization token was found.',
    },
    '403': {
      statusCode: 'FORBIDDEN',
      name: 'Forbidden',
      message: "You don't have permission to access this resource.",
    },
    '404': {
      statusCode: 'NOT_FOUND',
      name: 'NotFound',
      message: 'The resource you requested was not found.',
    },
    '409': {
      statusCode: 'CONFLICT',
      name: 'Conflict',
      message: 'Missing param',
    },
    '406': {
      statusCode: 'NOT ACCEPTABLE',
      name: 'NotAcceptable',
      message: 'An appropriate representation of the requested resource could not be found on this server.',
    },
    '410': {
      statusCode: 'GONE',
      name: 'Gone',
      message: 'Indicates that the resource requested is no longer available and will not be available again',
    },
    '413': {
      statusCode: 'PAYLOAD_TOO_LARGE',
      name: 'PayloadTooLarge',
      message: 'The request is larger than the server is willing or able to process',
    },
    '422': {
      statusCode: 'UNPROCESSABLE_ENTITY',
      name: 'UnprocessableEntity',
      message:
        `Unprocessable Entity response is when a request was well-formed, ` +
        `but the server could not follow the request due to semantic errors within the request.`,
    },
    '500': {
      statusCode: 'SERVER_ERROR',
      name: 'ServerError',
      message: 'Internal server error.',
    },
  };

  static readonly SERVER_ERRORS = {
    EvalError: 'EvalError',
    InternalError: 'InternalError',
    RangeError: 'RangeError',
    ReferenceError: 'ReferenceError',
    SyntaxError: 'SyntaxError',
    TypeError: 'TypeError',
    URIError: 'URIError',
  };
}
