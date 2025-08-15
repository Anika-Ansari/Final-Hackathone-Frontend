import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  // FETCH tasks
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    if (!title) return;
    if (editId) {
      const res = await axios.put(`http://localhost:5000/api/tasks/${editId}`, { title });
      setTasks(tasks.map(t => t._id === editId ? res.data : t));
      setEditId(null);
    } else {
      const res = await axios.post("http://localhost:5000/api/tasks", { title });
      setTasks([...tasks, res.data]);
    }
    setTitle("");
  };

  // DELETE
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // EDIT
  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  // TOGGLE completed
  const toggleComplete = async (task) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { completed: !task.completed });
    setTasks(tasks.map(t => t._id === task._id ? res.data : t));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard - CRUD Tasks</h2>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input 
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter task title" 
        />
        <button 
          onClick={handleSubmit} 
          style={{ padding: "10px 20px", marginLeft: "10px", borderRadius: "5px", border: "none", background: "#4CAF50", color: "white", cursor: "pointer" }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(t => (
          <li key={t._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", borderBottom: "1px solid #ddd" }}>
            <span style={{ textDecoration: t.completed ? "line-through" : "none", cursor: "pointer" }} onClick={() => toggleComplete(t)}>
              {t.title}
            </span>
            <div>
              <FaEdit onClick={() => editTask(t)} style={{ cursor: "pointer", marginRight: "10px", color: "#007BFF" }} />
              <FaTrash onClick={() => deleteTask(t._id)} style={{ cursor: "pointer", color: "#FF4136" }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
