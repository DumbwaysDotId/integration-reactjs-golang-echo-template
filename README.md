## Update data

- Update product data

  > File : `client/src/pages/UpdateProductAdmin.js`

  Don't forget to get `useMutation` :

  ```javascript
  import { useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../config/api';
  ```

  Store data on useState :

  ```javascript
  const [isLoading, setIsLoading] = useState(true); 
  const [categories, setCategories] = useState([]); //Store all category data
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
    category_id: []
  }); //Store product data
  ```

  Fetching product detail and category data :

  ```javascript
  async function getDataUpdate() {
    const responseProduct = await API.get('/product/' + id);
    const responseCategories = await API.get('/categories');
    setCategories(responseCategories.data.data);
    setPreview(responseProduct.data.data.image);

    const newCategoryId = responseProduct.data.data?.category?.map((item) => {
      return item.id;
    });

    setForm({
      ...form,
      name: responseProduct.data.data.name,
      desc: responseProduct.data.data.desc,
      price: responseProduct.data.data.price,
      qty: responseProduct.data.data.qty,
      category_id: newCategoryId
    });
    setIsLoading(false)
  }

  useEffect(() => {
    getDataUpdate()
  }, []);
  ```

  Handle if category selected :

  ```javascript
  // For handle if category selected
  const handleChangeCategoryId = (e, setIsChecked) => {
    const id = parseInt(e.target.value);
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setForm({ ...form, category_id: [...form.category_id, id] });
      setIsChecked(true)
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = form?.category_id?.filter((categoryId) => {
        return categoryId != id;
      });
      setForm({ ...form, category_id: newCategoryId });
      setIsChecked(false)
    }
  };
  ```

  Handle change data on form

  ```javascript
  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  ```

  Handle submit data :

  ```javascript
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      let category_id = form.category_id.map((categoryId) => Number(categoryId))
      formData.set('category_id', JSON.stringify(category_id));


      const response = await API.patch(
        '/product/' + id,
        formData,
        config
      );
      console.log(response.data);

      navigate('/product-admin');
    } catch (error) {
      console.log(error);
    }
  });
  ```

  Refactor `form` element :

  ```html
  <form onSubmit={(e) => handleSubmit.mutate(e)}>
  ```
  
  Import `CheckBox` element that we have made :

  ```js
  import CheckBox from '../components/form/CheckBox';
  ```

  Add this to html below category so it can get the categories within it's checked checkbox

  ```jsx
  {
    !isLoading && categories?.map((item, index) => (
      <label key={index} className="checkbox-inline me-4">
        <CheckBox
          categoryId={form?.category_id}
          value={item?.id}
          handleChangeCategoryId={handleChangeCategoryId}
        />
        <span className="ms-2">{item?.name}</span>
      </label>))
  }
  ```

- Update category data

  > File : `client/src/pages/UpdateCategoryAdmin.js`

  Don't forget to get `useMutation` :

  ```javascript
  import { useQuery, useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../config/api';
  ```

  Use useState for store data :

  ```javascript
  const [category, setCategory] = useState({ name: '' });
  ```

  Fething category data by id :

  ```javascript
  // Fetching category data by id from database
  let { data: categoryData } = useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    return response.data.data.name;
  });

  useEffect(() => {
    if (categoryData) {
      console.log(categoryData);
      setCategory({ name: categoryData });
    }
  }, [categoryData]);
  ```

  Handle submit data :

  ```javascript
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      await API.patch('/category/' + id, body, config);

      navigate('/category-admin');
    } catch (error) {
      console.log(error);
    }
  });
  ```

  Refactor `form` element :

  ```html
  <form onSubmit={(e) => handleSubmit.mutate(e)}>
  ```
