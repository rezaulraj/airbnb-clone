import { useState } from "react";

export default function Extra() {
  const [bulkData, setBulkData] = useState({
    name: "",
    email: "",
    pass: "",
    price: "",
  });
  const [saveData, setSaveData] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setBulkData({
      ...bulkData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setSaveData([...saveData, bulkData]);
    const priceValue = parseFloat(bulkData.price) || 0;
    setValue((prev) => prev + priceValue);
    setBulkData({ name: "", email: "", pass: "", price: "" });
  };

  console.log("bulkData", bulkData);
  console.log("saveData", saveData);

  const handleDelete = async (item) => {
    setSaveData([...saveData.filter((data) => data !== item)]);
  };

  return (
    <>
      <input
        name="name"
        value={bulkData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={bulkData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="pass"
        value={bulkData.pass}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        name="price"
        value={bulkData.price}
        onChange={handleChange}
        placeholder="price"
      />
      <button onClick={handleSubmit}>Submit</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
            <th>pass</th>
            <th>price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {saveData.map((item, ind) => (
            <tr key={ind}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.pass}</td>
              <td>{item.price}</td>
              <td onClick={() => handleDelete(item)} className="cursor-pointer">
                delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10">
        <input type="text" value={value} />
      </div>
    </>
  );
}
