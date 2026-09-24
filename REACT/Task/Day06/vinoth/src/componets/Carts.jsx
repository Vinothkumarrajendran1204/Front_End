

const Carts = () => {

  const arrObj = [

    { id: 1, name: "One", price: 100, category: "A" },
    { id: 2, name: "Two", price: 200, category: "B" },
    { id: 3, name: "Three", price: 300, category: "C" },
    { id: 4, name: "Four", price: 400, category: "D" }
  ];

  return (

    <div>
        <h2>Task03</h2>

      {arrObj.map((e) => (

        <div key={e.id}>
          <p>Name: {e.name}</p>
          <p>Price: {e.price}</p>
          <p>Category: {e.category}</p>
        </div>

      ))}
    </div>
  );
};

export default Carts;