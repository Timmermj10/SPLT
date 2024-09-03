import React, { useState, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Item } from './types';

interface CheckSummaryProps {
  items: Item[];
}

const CheckSummary: React.FC<CheckSummaryProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurant, date, members, items, tax : initialTax } = location.state as { restaurant: string; date: string; members: string[]; items: Item[], tax: string };

  const [tax, setTax] = useState(initialTax || '');

  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTax(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Total tax submitted:', tax);
    navigate('/final-summary', { state: { restaurant, date, members, items, tax } });
  };

  return (
    <div>
      <h2>Summary Page</h2>
      <div>
        <p>Restaurant: {restaurant}</p>
        <p>Date: {date}</p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.description}: ${item.price} - {item.members.join(', ')}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Total Tax:
          <input
            type="number"
            step="0.01"
            value={tax}
            onChange={handleTaxChange}
          />
        </label>
      </form>
      <Link to="/start-check/finalSummary" state={{ restaurant, date, members, items, tax }}>
          <button>Submit Tax</button>
      </Link>

      <Link to="/start-check" state={{ restaurant, date, members, items }} style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
        Go Back
      </Link>
    </div>
  );
};

export default CheckSummary;