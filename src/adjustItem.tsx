import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Item } from './types'; // Import the Item type

interface AdjustItemProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const AdjustItem: React.FC<AdjustItemProps> = ({ items, setItems }) => {
    const location = useLocation();
    const { restaurant, date, members: allMembers } = location.state as { restaurant: string; date: string; members: string[] };

  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();

  if (index === undefined) {
    // Handle the case where index is undefined
    navigate('/error'); // Navigate to an error page or handle it appropriately
    return null;
  }

  const itemIndex = parseInt(index, 10);
  const item = items[itemIndex];

  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [members, setMembers] = useState(item.members);

  const handleSave = () => {
    const updatedItems = [...items];
    updatedItems[itemIndex] = { description, price, members };
    setItems(updatedItems);
    navigate('/start-check', { state: { restaurant, date, members: allMembers } });
  };

  const handleMemberChange = (member: string) => {
    setMembers((prevMembers) =>
      prevMembers.includes(member)
        ? prevMembers.filter((m) => m !== member)
        : [...prevMembers, member]
    );
  };

  return (
    <div>
        <h1>Adjust Item</h1>
        <p>Restaurant: {restaurant}</p>
        <p>Date: {date}</p>
        <div>
            <label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </label>
        </div>
        <div>
            <label>
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            </label>
        </div>
        <div>
            <h3>Members</h3>
            {allMembers.length > 0 ? (
            allMembers.map((member) => (
                <div key={member}>
                <label>
                    <input
                    type="checkbox"
                    checked={members.includes(member)}
                    onChange={() => handleMemberChange(member)}
                    />
                    {member}
                </label>
                </div>
            ))
            ) : (
            <p>No members available</p>
            )}
        </div>
        <button onClick={handleSave}>Save</button>
        </div>
  );
};

export default AdjustItem;