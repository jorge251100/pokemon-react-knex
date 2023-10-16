import React, { useState } from 'react';

function GetAll(props) {
  const { entity, list, setter } = props;
  const [selectedValue, setSelectedValue] = useState('');

  const selectElement = (event) => {
    setSelectedValue(event.target.value);
    setter(event.target.value);
  };
  
  // console.log(list);

  return (
    <div>
      <label>Select {entity}:</label>
      <select value={selectedValue} onChange={selectElement}>
        <option value="0">Create new {entity}</option>
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GetAll;