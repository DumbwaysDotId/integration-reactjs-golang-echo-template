# Prepare

Before doing the integration, we make some preparations, including:

- Store front-end (client) & back-end (server) in one folder

## Server Side

- Install [Gorilla/handlers](https://pkg.go.dev/github.com/gorilla/handlers) package

  ```bash
  go get -u github.com/gorilla/handlers
  ```

- Import and Setup the Gorilla/handlers package for CORS

  > File: `main.go`

  - Import package

    ```go
    import (
      "dumbmerch/database"
      "dumbmerch/pkg/mysql"
      "dumbmerch/routes"
      "fmt"
      "net/http"

      "github.com/gorilla/handlers" // import this package ...
      "github.com/gorilla/mux"
      "github.com/joho/godotenv"
    )
    ```

  - Setup for CORS

    ```go
    // Setup allowed Header, Method, and Origin for CORS on this below code ...
    var AllowedHeaders = handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
    var AllowedMethods = handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS", "PATCH", "DELETE"})
    var AllowedOrigins = handlers.AllowedOrigins([]string{"*"})

    var port = "5000"
    fmt.Println("server running localhost:"+port)

    // Embed the setup allowed in 2 parameter on this below code ...
    http.ListenAndServe("localhost:"+port, handlers.CORS(AllowedHeaders, AllowedMethods, AllowedOrigins)(r))
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
  import axios from "axios";

  export const API = axios.create({
    baseURL: "http://localhost:5000/api/v1/",
  });

  export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.commin["Authorization"];
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
    import { QueryClient, QueryClientProvider } from "react-query";
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
      document.getElementById("root")
    );
    ```
