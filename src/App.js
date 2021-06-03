import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(()=>{
    const loadUsers = async() => {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data)
    }
    loadUsers()
  },[])

  const onChangeHandeler = (text) => {
    let matches = []
    if (text.length > 0) {
        matches = users.filter(user=>{
          const regex = new RegExp(`${text}`, "gi")
          return user.email.match(regex)
        })
    }

    setSuggestions(matches)
    setText(text)
  
  }
  const onSuggestHandler = (suggested)=>{
    setText(suggested)
  }
  return (
    <div className="App">
      
      <input type="text"name="test" className="col-md-12 input" style={{marginTop:10}}
      onChange= {e=>onChangeHandeler(e.target.value)} value={text}/>

    {suggestions && suggestions.map((item, i)=>
      <div key={i} className="col-md-12" onClick={()=>onSuggestHandler(item.email)}> {item.email}
       </div>
      
    )}
    </div>
  );
}

export default App;
