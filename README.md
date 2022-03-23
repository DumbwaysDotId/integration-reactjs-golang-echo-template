## Update data

- Update product data

  > File : `client/src/pages/UpdateProductAdmin.js`

  Don't forget to get `useMutation` :

  ```javascript
  import { useQuery, useMutation } from 'react-query';
  ```

  Get API config :

  ```javascript
  import { API } from '../config/api';
  ```

  Store data on useState :

  ```javascript
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  }); //Store product data
  ```

  Fetching product detail and categpry data :

  ```javascript
  // Fetching detail product data by id from database
  let { data: products, refetch } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });

  // Fetching category data
  let { data: categoriesData, refetch: refetchCategories } = useQuery(
    'categoriesCache',
    async () => {
      const response = await API.get('/categories');
      return response.data.data;
    }
  );

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setForm({
        ...form,
        name: products.name,
        desc: products.desc,
        price: products.price,
        qty: products.qty,
      });
      setProduct(products);
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [products]);
  ```

  Handle if category selected :

  ```javascript
  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked == true) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
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
      formData.set('categoryId', categoryId);

      // Insert product data
      const response = await API.patch(
        '/product/' + product.id,
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
