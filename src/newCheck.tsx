import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewCheck: React.FC = () => {
  const [restaurant, setRestaurant] = useState('');
  const [date, setDate] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState('');
  const navigate = useNavigate();

  const handleAddMember = () => {
    if (newMember.trim() !== '') {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  const handleStartCheck = () => {
    // Navigate to the start-check route with state
    navigate('/start-check', { state: { restaurant, date, members } });
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
      <button onClick={handleStartCheck}>Start Check</button>
    </div>
  );
};

export default NewCheck;