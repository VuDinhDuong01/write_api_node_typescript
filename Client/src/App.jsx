import './App.css'

function App() {
  const handleClick =(type)=>{
   window.open(`http://localhost:5000/api/auth/${type}`,'_self')
  }
  
  return (
      <div><button onClick={()=>handleClick('google')}>Google</button>
      <button onClick={()=>handleClick('facebook')}>Facebook</button>
      <button onClick={()=>handleClick('github')}>Github</button>
      </div> 
  )
}

export default App
