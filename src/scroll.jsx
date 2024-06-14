import React, { useEffect, useRef, useState } from "react";

const ScrollToTopAndBottom = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setLoading(false);

      setData(data);
    } catch (error) {
      setError(error.msg);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behaviour: "smooth",
    });
  };

  const handleScrollBottom = () => {
   bottomRef.current.scrollIntoView({behaviour : 'smooth'})
  }

  if (loading) {
    return <div>Loading...!</div>;
  }

  if (error) {
    return <div>Error Occurred... !</div>;
  }
  return (
    <div>
      <h1>Scroll To Top And Bottom Feature</h1>
      <h3>This is the top section</h3>
      <button onClick={handleScrollBottom}>Scroll To Bottom</button>
      <ul style={{ listStyle: "none" }}>
        {data && data.products && data.products.length
          ? data.products.map((item) => <li>{item.title}</li>)
          : null}
      </ul>
      <button onClick={handleScrollTop}>Scroll TO Top</button>
      <div ref={bottomRef}></div>
      <h3>This is the bottom of the page</h3>
    </div>
  );
};

export default ScrollToTopAndBottom;
