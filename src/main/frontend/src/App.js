import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import FacultyList from "./FacultyList";
import FacultyEdit from "./FacultyEdit";
import Faculty from "./Faculty";
import UserList from "./UserList";
import RegisterForFaculties from './RegisterForFaculties';
import LogIn from "./LogIn";
import UserRegistration from "./UserRegistration";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/getFaculties" exact={true} element={<FacultyList/>}/>
                <Route path="/faculty/:id" exact={true} element={<FacultyEdit/>}/>
                <Route path="/getFaculty/:id" exact={true} element={<Faculty/>}/>
                <Route path="/getUsers" exact={true} element={<UserList/>}/>
                <Route path="/registerForFaculties" exact={true} element={<RegisterForFaculties/>}/>
                <Route path="/logIn" exact={true} element={<LogIn/>}/>
                <Route path="/userRegistration" exact={true} element={<UserRegistration/>}/>
            </Routes>
        </Router>
    )
}

export default App;

/*
const App = () => {

  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);

    /!*const fetchData = async ()=>{
        let res = await fetch('/faculty')
        let data = await res.json()
        console.log(data)
        setFaculties(data)
    }*!/

  useEffect(() => {
    setLoading(true);
    fetch('/test')
        .then(response => {console.log(response); return response.json();})
        .then(data => {
          setFaculties(data);
          setLoading(false);
          console.log(data);
        })
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>JUG List</h2>
           {/!*faculties{.map(faculty =>
                <div key={faculty.id}>
                  {faculty.name}
                </div>}
            )*!/}
              {faculties.id}
              {faculties.name}
          </div>
        </header>
      </div>
  );
}

export default App;*/
