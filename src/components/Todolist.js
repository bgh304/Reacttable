import React, {useState} from 'react';
import '../App.css';
import Todotable from './Todotable'
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default function Todolist() {

  const [todo, setTodo] = useState({desc: '', date: ''}); //useStaten sisällä on OLIO!
  const [todos, setTodos] = useState([]);

  const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value}); //asettaa OLIO-arvon!
  }

  const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]); //hakasulut käsittelee taulukkona!
      setTodo({desc: '', date: ''});
  }

  const DeleteTodo = (row) => {
    console.log(row);
    setTodos(todos.filter((todo, index) => index !== row));
  }

  const columns = [
    {
        Header: () => (
          <span>
            <i className="fa-tasks" /> Progress
          </span>
        ),
        accessor: 'progress',
      },
    {
        Header: 'Description',
        accessor: 'desc'
    },
    {
        Header: 'Date',
        accessor: 'date'
    },
    {
        filterable: false,
        sortable: false,
        minWidth: 80,
        Cell: row => (
            <button onClick={() => DeleteTodo(row.index)}>Delete</button>
            
        )
    }
  ]
  
    return (
        <div className="App">
            <input value type="date" name="date" value={todo.date} onChange={inputChanged} />
            <input value={todo.desc} name="desc" onChange={inputChanged} />
            <button onClick={addTodo}>Add</button>    
            <ReactTable columns={columns} data={todos} defaultPageSize={10} filterable={true}/>
    </div>
    );
    //<Todotable todos={todos} DeleteTodo={DeleteTodo}/>
}//delete todos.mappiin