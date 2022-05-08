
import './App.css';
import {useState} from "react"
import Axios from "axios"

function App() {

  const [orderId,setOrderID] = useState(0);
  const [medicines,setMedicines] = useState("");
  const [amount,setAmount] = useState(0);
  const [discount,setDiscount] = useState(0);
  const [username,setUserName] = useState("");
  // const displayInfo = () =>{
  //   console.log(orderId + medicines + amount+ discount+username);
  // }

  const addOrder = () =>{
    Axios.post('http://localhost:3001/createOrder', {
      orderId : orderId, 
      medicines: medicines,
      amount : amount,
      discount: discount,
      username :username,
    }).then(()=>{
      console.log("success");
      alert("Added Successfully");
    });
  };

  const deleteOrder = () =>{
    Axios.delete('http://localhost:3001/deleteOrder',  { data: { orderId: orderId } }).then(()=>{
      console.log("success");
      alert("Deleted Successfully");
    });
  };

  const updateOrder = () =>{
    Axios.put('http://localhost:3001/updateOrder', {
      orderId : orderId, 
      medicines: medicines,
      amount : amount,
      discount: discount,
      username :username,
    }).then(()=>{
      console.log("success");
      alert("Updated Successfully");
    });
  };

  const getOrder = () =>{
    Axios.get('http://localhost:3001/getOrder', {
      params: {
      orderId : orderId, 
    }
  }).then((response)=>{
      
      console.log(response.data.recordsets[0][0]);
      document.getElementById("orderid").value = response.data.recordsets[0][0].OrderID;
      document.getElementById("medicines").value = response.data.recordsets[0][0].Medicines;
      document.getElementById("amount").value = response.data.recordsets[0][0].Amount;
      document.getElementById("discount").value = response.data.recordsets[0][0].Discount;
      document.getElementById("username").value = response.data.recordsets[0][0].UserName;
  });
}
  return (
    <div className="App">
      <div className="inputBox">
          <label>OrderID:</label>
          <input id="orderid" type = "number" onChange={(event)=>{
            setOrderID(event.target.value);
          }}></input><br></br>
          <label>Medicines:</label>
          <input id="medicines" type = "text" onChange={(event)=>{
            setMedicines(event.target.value);
          }}></input><br></br>
          <label>Amount:</label>
          <input id="amount" type = "number"  onChange={(event)=>{
            setAmount(event.target.value);
          }}></input><br></br>
          <label>Discount:</label>
          <input id="discount" type = "number"  onChange={(event)=>{
            setDiscount(event.target.value);
          }}></input><br></br>
          <label>Username:</label>
          <input id="username" type = "text"  onChange={(event)=>{
            setUserName(event.target.value);
          }}></input><br></br>
          <button className="buttons" onClick={addOrder}>Submit Order</button>
          <button className="buttons" onClick={deleteOrder}>Delete Order</button>
          <button className="buttons" onClick={updateOrder}>Update Order</button>
          <button className="buttons" onClick={getOrder}>Get Order Details</button>
          
      </div>
      
    </div>
  );
}

export default App;
