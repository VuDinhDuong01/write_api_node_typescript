import './App.css'

function App() {
  const handleClick =(type)=>{
   window.open(`http://localhost:5000/api/auth/facebook/callback`,'_self')
  }
  
  return (
      <div><button onClick={()=>handleClick('google')}>Google</button>
      <button onClick={()=>handleClick('facebook')}>Facebook</button>
      </div> 
  )
}

export default App
