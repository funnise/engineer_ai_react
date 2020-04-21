import React, { useCallback, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchApp } from './fetchApp';
import { TopPage } from './TopPage';
import { JsonDataPage } from './JsonDataPage';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
 /* const [count, setCount] = useState(0);
  const [postState, setPostState] = useState([]);

 const fetchApp = useCallback(async(number) => {
    console.log(postState);
    const result = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${number}`).catch((err) =>{
        throw err;
    })
   const resultJson = await result.json();
   const resultList = { id: count,
      list :resultJson.hits
  }
   setPostState(postState => [...postState,resultList]);
},[postState, count])

useEffect(()=>{
  fetchApp(count);
  setTimeout(setCount.bind(null, count + 1), 10000);
},[count]) 

const showList = useCallback(() =>{
  const list = [];
  if (postState.length > 0) {
    console.log(postState);
    postState.forEach((doc)=>{
      doc.list.forEach((doc) =>{
        list.push(<tr>
          <td>{doc.title}</td>
          <td>{doc.url}</td>
          <td>{doc.created_at}</td>
          <td>{doc.author}</td>
        </tr>)
      })
    })
  } 
  return list
}, [count])*/

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact={true} path='/' render={() => <TopPage/>}/>
        <Route  path='/jsonData' render={() => <JsonDataPage/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
