import { useEffect, useState } from "react";
import styles from "./style.module.css";

const Product = () => {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");

  const API =
    "https://www.googleapis.com/books/v1/volumes?q=%22chinua%20achebe%22";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(API);
        let data = await response.json();
        setProducts(data.items);
        console.log(data.items);
      } catch (error) {
        console.log("Error fetching Data", error);
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.productContainer}>
        {products.length === 0 ? (
          <p> Product Loading....</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className={styles.productBox}>
              <div className={styles.imageContainer}>
                <img src={product.volumeInfo.imageLinks.thumbnail} />
              </div>
              <div className={styles.productDetails}>
                <h1>{product.volumeInfo.title}</h1>
                <h1>{product.volumeInfo.subtitle}</h1>
                <h2>Authors: {product.volumeInfo.authors}</h2>
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
