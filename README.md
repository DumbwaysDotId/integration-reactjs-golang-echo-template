# Prepare

## Server Side

Before doing the integration, we make some preparations, including:

- Store front-end (client) & back-end (server) in one folder
- Install package Concurrently

  ```
  npm i concurrently
  ```

- Install package CORS

  ```
  npm i cors
  ```

- Add code below inside index.js file `server/index.js`

  ```javascript
  const port = 5000;

  app.use(express.json());
  app.use(cors());
  ```

- Add code below inside package.json file `server/package.json`

  ```javascript
  "scripts": {
    "start": "nodemon server.js",
    "client": "npm start --prefix ../client",
    "dev": "concurrently \"npm start\" \"npm run client\""
  },
  ```

- Run this code:

  ```
  npm run dev
  ```

## Client Side

### Axios

- Install Package Axios
  <br>
  A promise based HTTP client for the browser and Node.js

  ```javascript
  npm install axios
  ```

- Create API config in client side `client/src/config/api.js`

  ```javascript
  import axios from 'axios';

  export const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
  });

  export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.commin['Authorization'];
    }
  };
  ```

### React Query

- Install Package react-query

  ```bash
  npm i react-query
  ```

- Init QueryCLient and QueryClientProvider `client/src/index.js`

  - Import QueryClient and QueryClientProvider :

    ```javascript
    import { QueryClient, QueryClientProvider } from 'react-query';
    ```

  - Init Client :

    ```javascript
    const client = new QueryClient();

    ReactDOM.render(
      <React.StrictMode>
        <UserContextProvider>
          <QueryClientProvider client={client}>
            <Router>
              <App />
            </Router>
          </QueryClientProvider>
        </UserContextProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
    ```
