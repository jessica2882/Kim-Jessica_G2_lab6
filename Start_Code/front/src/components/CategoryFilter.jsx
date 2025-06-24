import { useEffect, useState } from "react";

export default function CategoriesFilter({ selectedCategories, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const toggleCategory = (id) => {
    if (selectedCategories.includes(id)) {
      onChange(selectedCategories.filter(catId => catId !== id));
    } else {
      onChange([...selectedCategories, id]);
    }
  };

  return (
    <div className="categories-filter">
      <h3>Filter by Categories</h3>
      {categories.map(cat => (
        <label key={cat.id} style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.id)}
            onChange={() => toggleCategory(cat.id)}
          />
          {cat.name}
        </label>
      ))}
    </div>
  );
}
