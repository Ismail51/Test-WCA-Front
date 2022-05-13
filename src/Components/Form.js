import axios from "axios";
import { useState, useEffect } from 'react'
import Squad from './Squad'

function Form() {
  const [liste, setList] = useState([])
  const getElement = () => {
    axios.get('https://testwca.herokuapp.com/').then(data => {
      console.log(data);
      setList(data.data)
    })
  }

  useEffect(() => {
    getElement()
  }, [])
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const sendData = (e) => {
    e.preventDefault()
    console.log('ookok');
    axios({
      method: 'post',
      url: 'https://testwca.herokuapp.com/',
      data: {
        name: name
      }
    }).catch(error => {
      console.log(error.response.status);
      setError(true)
    }).then(data => {
      getElement()
    })
  }

  return (
    <>
      <h2>Ajouter un(e) Argonaute</h2>
      <form onSubmit={sendData} class="new-member-form">
        {
          error ?
            <div className="error">
              <p>erreur</p>
            </div>
            : null
        }
        <label for="name">Nom de l&apos;Argonaute</label>
        <input onChange={(e) => { setName(e.target.value) }} id="name" name="name" type="text" placeholder="Charalampos" />
        <button type="submit">Envoyer</button>
      </form>
      <h2>Membres de l'équipage</h2>
      <section class="member-list">
        {
          liste.map(element => {
            return (
              <div class="member-item">{element.name}</div>
            )

          })
        }
      </section>
    </>

  )
}

export default Form