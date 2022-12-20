import React from 'react'
import axios from 'axios'

function App() {
  async function loadData(){
    const response = await axios.get('/all-food-items')
    console.log(response.data.data)
   
  }


  return (
    <div>
      
      <button onClick={loadData}>CALL API</button>
    </div>
  )
}

export default App
