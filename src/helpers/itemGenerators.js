export const generateOptions = (name, selectedItem, items , onChange, onBlur) => (
  <select 
  name={name} 
  value={selectedItem}
  onChange = {onChange}
  onBlur={onBlur}
  >
    {Object.entries(items).map(([key, value]) => (
      <option key={key} value={key}>{value}</option>
    ))}
  </select>
);
