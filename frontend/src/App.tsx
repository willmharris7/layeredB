import './App.css'
import GetDatabases from './components/GetDatabases'
import GetTop5 from './components/GetTop5'
import SearchBedrooms from './components/SearchBedrooms'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GetDatabases/>
        <GetTop5/>
        <SearchBedrooms/>
      </header>
    </div>
  )
}

export default App