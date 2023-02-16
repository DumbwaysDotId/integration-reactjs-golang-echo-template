# Prepare

Before doing the integration, we make some preparations, including:

- Store front-end (client) & back-end (server) in one folder

## Server Side

- Install [echo/middleware]

  ```bash
  go get -u github.com/labstack/echo/v4/middleware
  ```

- Import and Setup the echo/middleware package for CORS

  > File: `main.go`

  - Import package

    ```go
    import (
      "dumbmerch/database"
      "dumbmerch/pkg/mysql"
      "dumbmerch/routes"
      "fmt"

      "github.com/joho/godotenv"
      "github.com/labstack/echo/v4"
      "github.com/labstack/echo/v4/middleware"
    )
    ```

  - Setup for CORS

    ```go
	  e := echo.New()

    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
      AllowOrigins: []string{"*"},
      AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
      AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
    }))

    mysql.DatabaseInit()
    database.RunMigration()

    routes.RouteInit(e.Group("/api/v1"))

    e.Static("/uploads", "./uploads")

    fmt.Println("server running localhost:5000")
    e.Logger.Fatal(e.Start("localhost:5000"))
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

  // Create base URL API
  export const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
  });

  // Set Authorization Token Header
  export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common['Authorization'];
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
