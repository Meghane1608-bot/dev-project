import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api/category";

export default function CategoriesOverview() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: '#ffffff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginTop: 0, color: '#004d40' }}>Categories Overview</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Category ID</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Category Type</th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{category.id}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{category.type}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}