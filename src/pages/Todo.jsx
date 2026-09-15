import{ useEffect, useState } from 'react'

function Todo() {
    const [data , setData] = useState([])
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    useEffect( () => {
          fetch('http://localhost:5000/api/v1/todo')
        .then(res => res.json())
        .then(res => {
            console.log(res.todos);
            setData(res.todos)
            
        })
    } , [])

    const addTodo = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/api/v1/todo', {
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
    }
  return (
   <>
   <h1>HEllo World</h1>
    <form onSubmit={addTodo}>
        <input type="text" placeholder='Enter The title' value={title}  onChange={(e)=>setTitle(e.target.value)}/>
        <input type="text"  placeholder='Enter the description' value={description} onChange={e=>setDescription(e.target.value)}/>
        <button type='submit'>AddTODo</button>
    </form>
   {data.map( (item) => {
    return <div key={item._id}>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
    </div>
   })}
   </>
  )
}

export default Todo