import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Todo.module.css'
 
const Todo = ( {avatar_url, login}) => {
 
   const [ant, setAnt] = useState([])
       // { id: 1, name: 'Do homework' },
       // { id: 2, name: 'Read book' }])
 
       const [name, setName] = useState('')
       const [age, setAge] = useState('')
      const [idEdit, setIdEdit] = useState(0)
      useEffect( async () => {
        let ts = await getTasks();
        console.log(ts)
        setAnt(ts) 
    }, [] )
 
      const renderTasks = () => {
        if (ant !== null)
          return ant.map((task, index) => (
            <li key={index} className={styles.listItem}>
              {index + 1})
              {idEdit !== task.id ? (
                "name : " + task.name + " " + ", age : " + task.age
              ) : (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              )}
               <div className={styles.buttonContainer}>
              <button className={`${styles.button} ${styles.btnEdit}`} onClick={() => editTask(task.id)}>
                Edit
              </button> 
              <button className={`${styles.button} ${styles.btnDelete}`} onClick={() => deleteTask(task.id)}>
                Delete
              </button> 
              </div>
            </li>
          ));
      };
    
      const editTask = (id) => {
        setIdEdit(id);
        let t = ant.find((task) => +task.id === +id);
        setName(t.name);
        setAge(t.age);
        if (+idEdit === +id) {
          //Press Edit again
          let newTasks = ant.map((task, index) => {
            if (+task.id === +id) {
              ant[index].name = name;
              ant[index].age = age;
            }
            return task;
          });
          setAnt(newTasks);
          setIdEdit(0);
        }
      };
    
      const deleteTask = (id) => {
        console.log("delete id: ", id);
        let newTasks = ant.filter((task) => task.id !== +id);
        setAnt(newTasks);
      };
    
      const addTask = (name, age) => {
        if (ant.length < 10 && name != "" && age !="") {
          setAnt([
            ...ant,
            { id: ant[ant.length - 1].id + 1, name, age },
          ]);
    
          console.log(ant);
        } else {
          alert("Empty name or Tasks Name more 10 ");
        }
      };
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                   <img src={avatar_url} width="80" />
                    Todo  for <span>{login} </span>
               </h1>
    
            <div className="addContainer">
                <input
                    className={styles.text}
                    type="text"
                    name="addTask"
                    onChange={(e) => (setName(e.target.value))}
                />
                <input
                    className={styles.text}
                    type="text"
                    name="addTask"
                    onChange={(e) => (setAge(e.target.value))}
                />
                <button
                    className={`${styles.button} ${styles.btnAdd}`}
                    onClick={() => addTask(name,age)}>Add</button>
            </div>
            <ul className={styles.list}>
                {renderTasks()}
            </ul>
        </div>
    
    )
    }
    const getTasks = async () => {
        const res = await fetch('http://localhost:8000/')
        const json = await res.json()
        console.log(json)
        return json;
     }
     
    Todo.getInitialProps = async (ctx) => {
        const res = await fetch('https://api.github.com/users/wwarodom')
        const json = await res.json()
        return { login: json.login, avatar_url: json.avatar_url }
     }
     
    export default Todo