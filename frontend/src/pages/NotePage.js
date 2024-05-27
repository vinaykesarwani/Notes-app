import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow.svg'
import {Link} from 'react-router-dom'

const NotePage = () => {
  
  let {id}=useParams()
  let [note, setNote]=useState(null)
  
  useEffect(()=> {
    getNote()
  }, [id])

  let getNote = async () => {
    if (id==='new') return 
    let response =await fetch(`http://127.0.0.1:8000/api/notes/${id}`)
    let data= await response.json()
    setNote(data)
  }

  let updateNote = async () => {
    let m= await fetch(`http://127.0.0.1:8000/api/notes/${id}/update/`, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
  }

  let createNote = async () => {
    let m=await fetch(`http://127.0.0.1:8000/api/notes/create/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
  }

  let deleteNote= async () => {
    let m=await fetch(`http://127.0.0.1:8000/api/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}
    })
  }

  let handleSubmit = () => {
    if (!note) {
      deleteNote()
    } else if (id !== "new") {
      updateNote()
    } else if (id === "new" && note.body) {
      createNote()
    }
  }

    return (
    <div className="note">
        <div className='note-header'>
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit}/>
              {id!=='new' ? (
                <button onClick={deleteNote}>Delete</button>
              ): (
                <button onClick={handleSubmit}>Done</button>
              )}
            </Link>
          </h3>
          
        </div>
        <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage
