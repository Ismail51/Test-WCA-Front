import axios from "axios";
import { useState, useEffect } from 'react'


function Form() {
  const [liste, setList] = useState([])    // creation du state contenant la liste de l'equipage
  const getElement = () => {               // fonction qui permet de faire la requete vers l'API
    axios.get('https://testwca.herokuapp.com/').then(data => {
      console.log(data);
      setList(data.data)                   // fonction qui met à jour le state list
    })
  }

  useEffect(() => {                       // quand le composant est chargé, appel de la fonction getElement()
    getElement()
  }, [])
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const sendData = (e) => {             // fonction appelée lorsque le formulaire est posté
    e.preventDefault()                  // appel d'une fonction permetant d'eviter le rechargement de la page
    console.log('ookok');
    axios({                             // requete en post pour renvoyer les infos
      method: 'post',
      url: 'https://testwca.herokuapp.com/',
      data: {
        name: name
      }
    }).catch(error => {                 // si erreur alors le state error passe en true et affiche une erreur sur la page
      console.log(error.response.status);
      setError(true)
    }).then(data => {                   // si pas d'erreur on rappelle la fonction getElement
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
        <label for="name">Nom de l'Argonaute</label>
        <input onChange={(e) => { setName(e.target.value) }} id="name" name="name" type="text" placeholder="Charalampos" />
        <button type="submit">Envoyer</button>
      </form>
      <h2>Membres de l'équipage</h2>
      <section class="member-list">
        {
          liste.map(element => {                 // On parcourt le state afin de retourner la clé name de chaque élément
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