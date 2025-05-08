function OrderForm() {
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleSubmit = async () => {
    try {
      const orderData = {
        clientName,
        address,
        phone,
        items: cartItems
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
      } else {
        alert("Order failed: " + result.error);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Name" />
      <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
}
