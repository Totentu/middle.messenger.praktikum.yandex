// eslint-disable-next-line no-unused-vars
enum METHODS { GET = 'GET', POST = 'POST', PUT = 'PUT', DELETE = 'DELETE'}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TData = any;

interface IHTTPOptions {
  headers?: Record<string, string>;
  timeout?: number;
  data?: TData;
}
interface IRequest extends IHTTPOptions {
  method: METHODS;
}

/*
function queryStringify (data: Record<string, string>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
*/

export default class HTTPTransport {
    get = (url: string, options: IHTTPOptions): Promise<unknown> => {
      return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: IHTTPOptions): Promise<unknown> => {
      return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: IHTTPOptions): Promise<unknown> => {
      return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: IHTTPOptions): Promise<unknown> => {
      return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: IRequest, timeout = 5000): Promise<unknown> => {
      const {headers = {}, method, data} = options;

      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        const isGet = method === METHODS.GET;
        xhr.open(method, url);

        xhr.setRequestHeader('content-type', 'application/json');

        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
        xhr.withCredentials = true;

        xhr.onload = function () {
          resolve(xhr);
        };
        xhr.onerror = function () {
          reject(new Error('Произошла ошибка при получении ответа'));
        };
        xhr.onabort = function () {
          reject(new Error('Запрос был прерван'));
        };
        xhr.timeout = timeout;
        xhr.ontimeout = function () {
          reject(new Error('Превышено время ожидания ответа'));
        };

        if (isGet || !data) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      });
    };
}
