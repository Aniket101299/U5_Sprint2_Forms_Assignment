import axios from "axios";
import { useEffect, useState } from "react";
// import {useId} from "react";

export const Forms = ()=> {

const [data,setData] = useState([]);

const [call,setCall] = useState(false);

const [formData,setFormData] = useState({
    name:"",
    age:"",
    address:"",
    department:"",
    salary:"",
    married:""
});


useEffect(()=>{
     axios.get("http://localhost:3002/users").then((response)=>{
     setData(response.data);
})

},[call])


const handleChange = (e)=> {
    const {id,value} = e.target;
    
    if(id==="married") {
      let isChecked = e.target.checked;
      setFormData({
        ...formData,
        [id]:isChecked
     });
    } else {
        setFormData({
            ...formData,
            [id]:value
        });
    }

}


const handleSubmit = (e)=> {
    e.preventDefault();
    alert("Employee created Successfully");
    axios.post("http://localhost:3002/users",formData);
    setFormData({
        name:"",
        age:"",
        address:"",
        department:"",
        salary:"",
        married:""
    });
    setCall(!call);
}
 

    return(
        <> 
      <form onSubmit={handleSubmit} >
          <h1>Employee Signup form</h1>
         <input id="name" value={formData.name} type="text" placeholder="enter name" onChange={handleChange}/>
         <br/>
         <input id="age" value={formData.age} type="number" placeholder="enter age"onChange={handleChange}/>
         <br/>
         <input id="address" value={formData.address} type="text" placeholder="enter address" onChange={handleChange}/>
         <br/>
         <select id="department" value={formData.department} onChange={handleChange}>
             <option value="">Select Department</option>
             <option id="mechanical" value="mechanical">Mechanical</option>
             <option id="electrical" value="electrical">Electrical</option>
             <option id="electronics" value="electronics">Electronics And Telecommunication</option>
             <option id="cse" value="cse">Computer Science Engineering</option>
         </select>
         <br/>
         <input id="salary" value={formData.salary} type="text" placeholder="enter salary" onChange={handleChange}/>
         <br/>
         <label>Married</label>
         <input id="married"  type="checkbox" value="" name="" onChange={handleChange} />
         <br/>
         <input type="submit" value="Create Employee"/>
      </form>

    <br/>
      
      <table style={{border:"1px solid black",margin:"auto"}}>
      
      <thead>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Married</th>
      </thead>
      <tbody >
      {data.map((item)=>{
        return <>
         
              <tr >
                  <td >{item.id}</td>
                  <td >{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.address}</td>
                  <td>{item.department}</td>
                  <td>{item.salary}</td>
                  <td>{item.married === true? "yes" : "no" }</td>
              </tr>
          
          </>
        })}
        </tbody>
      </table>
      
    



     </>
    );

}