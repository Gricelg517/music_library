import { useEffect, useState } from 'react';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './components/DataContext';

function App(){
  let [search, setSearch] = useState('')
  let [message, setMessage] = useState ('Search for Music!')
  let [data, setData] = useState ([])

  const handleSearch =(term) => {
    // e.preventDefault()
    setSearch(term)
}

  useEffect(() => {
    const fetchData = async () => {
      if(search) {
      const url = new URL(`https://itunes.apple.com/search?term=${search}`)
      const response = await fetch(url)
      const data = await response.json()
      console.log('data', data)
      if (data.results.length > 0) { 
        setData(data.results)
      } else {
        setMessage('Not Found')
        setData()
       }
      }
    }

    fetchData()
  }, [search])

  return (
    <div> 
      <SearchBar handleSearch={handleSearch} />
      {message}
      <DataContext.Provider value={data}> 
          <Gallery />
      </DataContext.Provider>
    </div>
  )
}

export default App
 
