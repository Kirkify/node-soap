/*
 * Copyright (c) 2011 Vinay Pulim <vinay@milewise.com>
 * MIT Licensed
 */

import * as BluebirdPromise from 'bluebird';
//import {Client} from './client';
import {IOptions} from './types';
//import {open_wsdl, WSDL} from './wsdl';

//export { Client } from './client';
//export { WSDL } from './wsdl';

//type WSDLCallback = (error: any, result?: WSDL) => any;

function _requestWSDL(url: string, options: IOptions, callback: any) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  //open_wsdl(url, options, callback);
}

export type CreateClientCallback = (err: any, client: any) => void;

export function createClient(url: string, callback: CreateClientCallback, endpoint?: string): void;
export function createClient(url: string, options: IOptions, callback: CreateClientCallback, endpoint?: string): void;
export function createClient(url: string, p2: CreateClientCallback | IOptions, p3?: CreateClientCallback | string, p4?: string): void {
  let endpoint: string = p4;
  let callback: CreateClientCallback;
  let options: IOptions;
  if (typeof p2 === 'function') {
    callback = p2;
    endpoint = p3 as string;
    options = {};
  } else if (typeof p3 === 'function') {
    options = p2;
    callback = p3;
    endpoint = p4;
  }
  endpoint = options.endpoint || endpoint;
  _requestWSDL(url, options, (err, wsdl) => {
    callback(err, wsdl);
  });
}

export function createClientAsync(url: string, options?: IOptions, endpoint?: string): BluebirdPromise<any> {
  if (typeof options === 'undefined') {
    options = {};
  }
  return new BluebirdPromise((resolve, reject) => {
    createClient(url, options, (err, client) => {
      if (err) {
        reject(err);
      }
      resolve(client);
    }, endpoint);
  });
}
