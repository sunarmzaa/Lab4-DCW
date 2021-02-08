import { useState } from 'react'



const Todo = () => {

    const [tasks, setTasks] = useState(
        [
            { id: 1, name: 'Reading a book' },
            { id: 2, name: 'Sleep at night' }
        ])

    const [name, setName] = useState('')

    const [idEdit, setIdEdit] = useState(0)


    const renderTask = () => {

        return tasks.map((task, index) =>
        (<li key={index}>
            {task.id}
            {(+idEdit !== +task.id) ?
                task.name :
                (<input type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />)
            }



            <div className="btnEdit">
                <button onClick={() => editTask(task.id, task.name)}>Edit</button>
            </div>

            <div className="btnDelete">
                <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
            


        </li>))
    }
    

    const editTask = (id) => {
        setIdEdit(id)
        let t = tasks.find((task) => +task.id === +id)
        setName(t.name)
        if (+idEdit === +id) {
            let newTasks = tasks.map((task, index) => {
                if (+task.id === +id)
                    tasks[index].name = name
                return task
            })
            setTasks(newTasks)
            setIdEdit(0)
        }
    }





    const addTask = (name) => {
        console.log('Add')
        const id = tasks[tasks.length - 1].id + 1;
        setTasks([...tasks, { id, name }])
    }

    const deleteTask = (id) => {
        console.log('Delete')
        let newTasks = tasks.filter((task) => (+task.id !== +id))
        setTasks(newTasks)
    }

    return (
        <div>
            <h1>Todo</h1>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            
            <button onClick={() => addTask(name)}>Add</button>


            <ul>
                {renderTask()}
            </ul>

        </div>
    )
}

export default Todo