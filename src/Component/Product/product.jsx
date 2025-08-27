import { useEffect, useState } from "react";
import styles from "./style.module.css";

const Product = () => {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [inputValue, setInputValue] = useState("");
  let [query, setQuerry] = useState("chinua achebe");

  function handleSubmit(e) {
    e.preventDefault();
    setQuerry(inputValue);

    setInputValue("");
  }

  const API = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(API);
        let data = await response.json();
        setProducts(data.items || []);
        console.log(data.items);
      } catch (error) {
        console.log("Error fetching Data", error);
        setError(error);
      }
    };
    fetchData();
  }, [query]);

  return (
    <>
      <section className={styles.headerContainer}>
        <header>
          Book<span>Room</span>
        </header>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="text"
            placeholder="Search For Books...."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button>Submit</button>
        </form>
        <button>Log In</button>
        <button>Sign up</button>
      </section>
      <section className={styles.productContainer}>
        {products.length === 0 ? (
          <p> Product Loading....</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.productBox}>
              <div className={styles.imageContainer}>
                <img src={product.volumeInfo.imageLinks?.thumbnail} />
              </div>
              <div className={styles.productDetails}>
                <h1>{product.volumeInfo.title}</h1>
                <h1>{product.volumeInfo.subtitle}</h1>
                <h1>Authors: {product.volumeInfo.authors}</h1>
                <h1>Publusher:{product.volumeInfo.publisher}</h1>
                <h1>Published Date:{product.volumeInfo.publishedDate}</h1>
                <p>{product.volumeInfo.description}</p>
              </div>
            </div>
          ))
        )}
      </section>
    </>
  );
};

export default Product;
