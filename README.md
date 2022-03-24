## Insert data

- Insert data to register account

  > File : `client/src/components/auth/Register.js`

  Get `useMutation` :

  ```javascript
  import { useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../../config/api';
  ```

  Store data with useState :

  ```javascript
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  ```

  Insert data process using useMutation :

  ```javascript
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);

      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });
  ```

  Refactor form element :

  ```html
  <form onSubmit={(e) => handleSubmit.mutate(e)}>
  ```

- Insert data for login process

  > File : `client/src/components/auth/Login.js`

- Insert product data

  > File : `client/src/pages/AddProductAdmin.js`

- Insert category data

  > File : `client/src/pages/AddProductAdmin.js`

* Check Auth for stay login if refresh page

  > File : `client/src/App.js`

  Get API config & setAuthToken :

  ```javascript
  import { API, setAuthToken } from './config/api';
  ```

  Init token on axios every time the app is refreshed :

  ```javascript
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  ```

  Init user context :

  ```javascript
  const [state, dispatch] = useContext(UserContext);
  ```

  Redirect Auth :

  ```javascript
  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      history.push('/auth');
    } else {
      if (state.user.status == 'admin') {
        history.push('/complain-admin');
      } else if (state.user.status == 'customer') {
        history.push('/');
      }
    }
  }, [state]);
  ```

  Check user token :

  ```javascript
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  ```

  > File : `client/src/context/userContext.js`

  Modif the switchcase :

  ```javascript
  switch (type) {
    case 'USER_SUCCESS':
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
  ```
