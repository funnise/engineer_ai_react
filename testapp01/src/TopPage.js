import React, { useCallback, useState, useEffect } from 'react';
import useRouter from "use-react-router";

export const TopPage =() =>{
    const [count, setCount] = useState(0);
    const [islocked, setIsLocked] = useState(false);
    const { history } = useRouter();
    const [postState, setPostState] = useState([]);

const fetchApp = useCallback(async(number) => {
    setIsLocked(true)
    const result = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${number}`).catch((err) =>{
        throw err;
    })
   const resultJson = await result.json();
   const resultList = { id: count,
      list :resultJson.hits
  }
   setPostState(postState => [...postState,resultList]);
   setIsLocked(false);
},[postState, count])

useEffect(() => {
    if(islocked) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [islocked]);

useEffect(()=>{
  if(!islocked) {
  fetchApp(count);
  setTimeout(setCount.bind(null, count + 1), 10000);
  }
},[count]) 


const showList = useCallback(() =>{
  const list = [];
  if (postState.length > 0) {
    console.log(postState);
    postState.forEach((doc)=>{
      doc.list.forEach((doc) =>{
        list.push(<tr onClick={()=>history.push('/jsonData',doc)}>
          <td>{doc.title}</td>
          <td>{doc.url}</td>
          <td>{doc.created_at}</td>
          <td>{doc.author}</td>
        </tr>)
      })
    })
  } 
  return list
}, [count])

const handleScroll= useCallback(async()=>{
    const doch = document.documentElement.offsetHeight; // ページ全体の高さ
    const winh = window.innerHeight; // ウィンドウの高さ
    const bottom = doch - winh;
    if ( bottom * 0.98 <= document.documentElement.scrollTop) {
        if(!islocked) {
            console.log('scroll')
            await fetchApp(count)
            setCount(count + 1); 
        }
    }
}, [count])

  return (
    <div className="App">
      <h1>JsonPostList</h1>
      <p>{count}</p>
      <table>
        <tr><td>title</td><td>Url</td><td>created_at</td><td>author</td></tr>
          {showList()}
      </table>
    </div>
  );
}

