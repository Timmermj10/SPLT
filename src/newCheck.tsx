import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const NewCheck: React.FC = () => {
  const location = useLocation();
  const { restaurant: initialRestaurant, date: initialDate, members: initialMembers } = location.state || {};

  const [restaurant, setRestaurant] = useState(initialRestaurant || '');
  const [date, setDate] = useState(initialDate || '');
  const [members, setMembers] = useState<string[]>(initialMembers || []);
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    if (newMember.trim() !== '') {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  return (
    <div>
      <h2>New Check</h2>
      <div>
        <label>
          Restaurant Name:
          <input
            type="text"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Add Member:
          <input
            type="text"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
          />
        </label>
        <button onClick={handleAddMember}>Add Member</button>
      </div>
      <div>
        <h3>Members</h3>
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
      <Link to="/start-check" state={{ restaurant, date, members }}>
        <button>Start Check</button>
      </Link>
      <Link to="/" style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
        Go Back
      </Link>
    </div>
  );
};

export default NewCheck;