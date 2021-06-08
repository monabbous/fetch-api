# Simple Fetch Api

This package is abstracted from and inspired by the packages

- `axios`
- `@monabbous/ng-api-wrapper`
  
  where it simplifies the requests to the API

## Features

- Lightweight.
- Predefined Multiple Named Api Base Urls only once.
- Auto Content parsing based on `responseType` value in the request.
- Ability to intercept the request before it is sent.

## Installation

Using cdn

_comming soon_

Using npm

```bash
npm i @monabbous/fetch-api
```

## Implementation

#### Importing

Import the class
_typescript or modern javascript_

```ts
import {FetchApi} from "@monabbous/fetch-api";
```

_javascript_

```javascript
const {FetchApi} = require('@monabbous/fetch-api');
// Or
const FetchApi = require('@monabbous/fetch-api').FetchApi; 
```

#### Setting up

First thing you must do is define the api urls with its versions

```ts
FetchApi.servers = {
    spiza: {
        baseUrl: 'https://store.example/',
        versions: {
            1: 'api/v1/',
        },
        defaultVersion: 1,
    },
    wiki: {
        baseUrl: 'https://wiki.example/',
        versions: {
            1: 'api/v1/',
            2: 'api/v2/',
        },
        defaultVersion: 1,
    },
}
```

Then define the default server name

```ts
FetchApi.defaultServer = 'primary';
```

#### Usage

Now after setting up, you can simply request your paths

```javascript
FetchApi.get({
    // request path: https://store.example/api/v1/items
    path: 'items',
}).then(m => {
    console.log(m);
});
```

Or you can specify the destination baseUrl and version

```javascript
FetchApi.get({
    // request path: https://wiki.example/api/v2/faqs
    path: 'faqs',
    server: 'wiki',
    version: 2,
}).then(m => {
    console.log(m);
});
```

By default, it returns the response type as `json` however you can change the response to 
- `blob`
- `text`
- `arraybuffer`

```javascript
FetchApi.get({
    // request path: https://wiki.example/api/v2/faqs
    path: 'random-image',
    server: 'wiki',
    version: 2,
    responseType: 'blob'
}).then(m => {
    console.log(m);
});
```

#### Intercepting

You can intercept the request, for example to add the Authorization header
```javascript
FetchApi.interceptors.request = (request, next) => {
    request.headers = new Headers(request.headers);
    request.headers.append('Authorization', 'bearer' + localStorage.token);
    return next(request);
};
```

## Issuing and Contributing
You can issue, fork, review on the package's [github repo](https://github.com/monabbous/fetch-api.git).

## Support me :D
I would appreciate it if you would [buymacoffee](https://www.buymeacoffee.com/nabous)

![https://www.buymeacoffee.com/nabous](https://img.buymeacoffee.com/api/?url=aHR0cHM6Ly9pbWcuYnV5bWVhY29mZmVlLmNvbS9hcGkvP25hbWU9bmFib3VzJnNpemU9MzAwJmJnLWltYWdlPWJtYyZiYWNrZ3JvdW5kPTVGN0ZGRg==&creator=nabous&design_code=1&design_color=%235F7FFF&slug=nabous)

And also you can @ my Twitter [@SpideymanThe1st](https://twitter.com/SpideymanThe1st)
