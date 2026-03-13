/* External api calls require import of HTTPCLIENT

  Angular App ---> Http ---> External API ---> 
  API returns data in form of JSON ---> Angular component receives data

  This import allows the use of get, put, post and delete requests on the api
*/

/* External api calls require import of OBSERVABLE
  Observable comes from RxJS (Reactive Extensions for JavaScript).

  Angular uses Observables to handle asynchronous data streams, such as:
  - HTTP requests
  - user events
  - WebSocket data

      WebSocket data refers to the information exchanged over a WebSocket connection, which is a protocol designed for real-time, bidirectional communication between a client (usually a browser) and a server.
      Unlike normal HTTP requests (request → response → connection closed), WebSockets keep the connection open, allowing both the client and server to send data at any time.
      
      WHAT IS WEBSOCKET ?
        WebSocket is a communication protocol that works over a single persistent TCP connection.
        Typical flow:
        Client sends an HTTP request asking to upgrade to WebSocket.
        Server accepts the upgrade.
        A persistent WebSocket connection is established.
        Both client and server can now send messages (data frames) anytime.

    - timers 

    Observable created 
            ↓
    subscribe() called
            ↓
    HTTP request sent
            ↓
    Response returned
            ↓
    data received in component

    without subscribe() calls, no data will be returned

    COMPLETE FLOW

      Component
        ↓
      ProductService
        ↓
      HttpClient
        ↓
      External API
        ↓
      Observable<Product[]>
        ↓
      subscribe()
        ↓
      Display data in UI
*/

import { Injectable } from '@angular/core';
import { ProductInterface } from '../interfaces/ProductInterface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private apiUrl = 'https://fakestoreapi.com/products';

  constructor (private httpClient: HttpClient) {
    // no code required
  }
  // get all products from the api
  getProducts(): Observable<ProductInterface[]> {
    return this.httpClient.get<ProductInterface[]>(this.apiUrl);
  }

}
