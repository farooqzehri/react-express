import { useEffect, useState } from 'react'
import '../index.css'

function Todo() {
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editid, setEditid] = useState(null)
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)


    useEffect(() => {
        fetch('http://localhost:5000/api/v1/todo')
            .then(res => res.json())
            .then(res => {
                console.log(res.todos);
                setData(res.todos)
                setLoading(false)

            }).catch(err => {
                console.log("error Occured");
                setError(true)
                setLoading(false)
            })
    }, [])




    const addTodo = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/api/v1/todo', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
        setTitle('')
        setDescription('')

    }

    const deleteTodo = (id) => {
        fetch(`http://localhost:5000/api/v1/todo/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.data);

            })
        setData(oldData => {
            return oldData.filter(item => item._id !== id);
        });


    }

    const editTodo = (e) => {
        e.preventDefault()

        fetch(`http://localhost:5000/api/v1/todo/${editid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description

            })
        })
            .then(res => res.json())
            .then(res => {
                const updatedTodo = res.todo ?? res.data
                if (updatedTodo) {
                    setData(oldData => oldData.map(item => (
                        item._id === editid ? updatedTodo : item
                    )))
                }
                setEditid(null)
                setTitle('')
                setDescription('')
            })
    }
    return (
      

       
             <div className="min-h-screen bg-gray-100 py-10 px-4">

    <div className="max-w-2xl mx-auto">

        {loading && (
            <h1>Loading...</h1>
        )}

        {error && (
            <p>Error occurred while fetching todos.</p>
        )}

        {data.length === 0 && !loading && !error && (
            <div>
                <h3>No Todo Found.</h3>
                <h4>Add Your First Todo</h4>
            </div>
        )}

        {/* Form */}

        {/* Todo List */}

    </div>



            <div className="max-w-2xl mx-auto">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    My Todo App
                </h1>

                {/* Form */}
                <form
                    onSubmit={editid ? editTodo : addTodo}
                    className="bg-white p-6 rounded-xl shadow-md mb-8"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        {editid ? "Edit Todo" : "Add New Todo"}
                    </h2>

                    <div className="space-y-4">

                        <input
                            type="text"
                            placeholder="Enter the title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Enter the description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            {editid ? "Update Todo" : "Add Todo"}
                        </button>
                        {editid && (
                            <button onClick={()=>{
                                setEditid(null)
                                setTitle('')
                                setDescription('')}}>cancel</button>
                        )}

                    </div>
                </form>

                {/* Todo List */}
                <div className="space-y-4">

                    {data.map((item) => {
                        return (
                            <div
                                key={item._id}
                                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center"
                            >

                                {/* Todo Content */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-500 mt-1">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2 ml-4">

                                    <button
                                        onClick={() => {
                                            setEditid(item._id);
                                            setTitle(item.title);
                                            setDescription(item.description);
                                        }}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => deleteTodo(item._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

        </div>
    )
       
     
}

export default Todo