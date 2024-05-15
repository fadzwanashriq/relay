import React, { useState } from 'react';
import data from "./ListData.json";

function List(props) {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const filteredData = data.filter((el) => {
    if (props.input === '') {
      return true;
    } else {
      return el.topic.toLowerCase().includes(props.input.toLowerCase());
    }
  });

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <ul>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item.id)}>
            {item.topic}
            {selectedItemId === item.id && (
              <div className="text-black-500">{item.description}</div>
            )}
          </li>
        ))
      ) : (
        <li>No results found.</li>
      )}
    </ul>
  );
}

export default List;