import { useState } from "react";

export default function useFetch(baseUrl) {
  const [loading, setLoading] = useState(true);

  function get(url) {
    return new Promise((resolve, reject) => {
      fetch(baseUrl + url)
        .then(response => response.json())
        .then(data => {
          if (!data) {
            setLoading(false);
            return reject(data);
          }
          setLoading(false);
          resolve(data);
        })
        .catch(error => {
          setLoading(false);
          reject(error);
        });
    });
  }

  async function post(url, body) {
    try {
      const resp = await fetch(baseUrl + url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      const data = await resp.json();
      console.log('Here1');
      setLoading(false);
      return data;
    } catch (err) {
      console.log('Here2');
      console.log(err);
      setLoading(false);
    }
  }

  return { get, post, loading };
};