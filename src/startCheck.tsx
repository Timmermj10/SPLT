import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/startCheck.css';
import { Item } from './types';

interface StartCheckProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

function StartCheck({ items, setItems }: StartCheckProps) {
  const location = useLocation();
  const { restaurant, date, members: allMembers } = location.state as { restaurant: string; date: string; members: string[] };

  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem: Item = { description, price, members: [] };
    setItems([...items, newItem]);
    setDescription('');
    setPrice('');
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Start Check</h2>
      <div>
        <p>Restaurant: {restaurant}</p>
        <p>Date: {date}</p>
        <p>Members:</p>
        <ul>
          {allMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="text"
              name="description"
              placeholder='Burger'
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          <label>
            <input
              type="number"
              name="price"
              step="0.01"
              placeholder='4.99'
              value={price}
              onChange={handlePriceChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link to={`/start-check/adjust/${index}`} state={{ restaurant, date, members: allMembers }}>
                {item.description}: ${item.price}
            </Link>
            <button onClick={() => handleRemoveItem(index)}>x</button>
            {item.members.length > 0 && (
              <span> - {item.members.join(', ')}</span>
            )}
          </li>
        ))}
      </ul>

      <Link to="/start-check/summary" state={{ restaurant, date, members: allMembers, items }}>
        <button>Continue</button>
      </Link>

      <Link to="/new-check" state={{ restaurant, date, members: allMembers, items}} style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
        Go Back
      </Link>
    </div>
  );
}

export default StartCheck;