import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Item } from './types';

interface FinalCheckSummaryProps {
  items: Item[];
}

const FinalCheckSummary: React.FC<FinalCheckSummaryProps> = () => {
  const location = useLocation();
  const { restaurant, date, members, items, tax } = location.state as { restaurant: string; date: string; members: string[]; items: Item[]; tax: string };

  const totalTax = parseFloat(tax);
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const itemsWithTax = items.map(item => ({
    ...item,
    tax: (parseFloat(item.price) / totalPrice) * totalTax,
  }));

  const memberItems = members.reduce((acc, member) => {
    acc[member] = itemsWithTax
      .filter(item => item.members.includes(member))
      .map(item => ({
        ...item,
        price: (parseFloat(item.price) / item.members.length).toFixed(2),
        tax: (item.tax / item.members.length).toFixed(2),
      }));
    return acc;
  }, {} as Record<string, { price: string; tax: string; description: string; members: string[] }[]>);

  return (
    <div>
      <h2>Final Summary</h2>
      <div>
        <p>Restaurant: {restaurant}</p>
        <p>Date: {date}</p>
        <p>Tax: ${tax}</p>
        <ul>
          {itemsWithTax.map((item, index) => (
            <li key={index}>
              {item.description}: ${item.price} + ${item.tax.toFixed(2)} tax - {item.members.join(', ')}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Member Summary</h3>
        {members.map(member => (
          <div key={member}>
            <h4>{member}</h4>
            <ul>
              {memberItems[member].map((item, index) => (
                <li key={index}>
                  {item.description}: ${(parseFloat(item.price) + parseFloat(item.tax)).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Total: ${memberItems[member].reduce((sum, item) => sum + parseFloat(item.price) + parseFloat(item.tax), 0).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <Link to="/start-check/summary" state={{ restaurant, date, members, items, tax }} style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
        Go Back
      </Link>
    </div>
  );
};

export default FinalCheckSummary;