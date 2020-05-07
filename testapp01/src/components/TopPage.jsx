import React, { useCallback, useState, useEffect } from 'react';
import useRouter from "use-react-router";
import { fetchData } from '../utils/fetchData';

export const TopPage = () => {
  const [count, setCount] = useState(0);
  const [islocked, setIsLocked] = useState(false);
  const { history } = useRouter();
  const [postState, setPostState] = useState([]);

  useEffect(() => {
    if (!islocked) {
      fetchApp(count);
      setTimeout(setCount.bind(null, count + 1), 10000);
    }
  }, [count])
  useEffect(() => {
    if (islocked) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [islocked]);

  const fetchApp = useCallback(async (number) => {
    setIsLocked(true)
    const resultList = await fetchData(number).catch((err) => {
      throw err;
    })
    setPostState(postState => [...postState, resultList]);
    setIsLocked(false);
  }, [postState, count])

  const handleScroll = useCallback(async () => {
    const doch = document.documentElement.offsetHeight; // ページ全体の高さ
    const winh = window.innerHeight; // ウィンドウの高さ
    const bottom = doch - winh;
    if (bottom * 0.98 <= document.documentElement.scrollTop) {
      if (!islocked) {
        console.log('scroll')
        await fetchApp(count)
        setCount(count + 1);
      }
    }
  }, [count])

  const showList = useCallback(() => {
    const list = [];
    if (postState.length > 0) {
      const values = [];
      const newList = postState.filter(e => {
        if (values.indexOf(e["id"]) === -1) {
          values.push(e["id"]);
          return e;
        }
      });

      newList.forEach((doc) => {
        doc.list.forEach((n, key) => {
          list.push(<tr onClick={() => history.push('/jsonData', doc)} key={String(key) + '_' + String(doc.id)}>
            <td>{n.title}</td>
            <td>{n.url}</td>
            <td>{n.created_at}</td>
            <td>{n.author}</td>
            </tr>)
        })
        list.push(<tr key={String(doc.id) + '-pageCount'}><td style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 18 }}>page: {doc.id}</td></tr>)
      })
    }
    return list
  }, [count])

  return (
    <div className="App">
      <h1>JsonPostList</h1>
      <table>
        <thead>
          <tr><td>title</td><td>Url</td><td>created_at</td><td>author</td></tr>
        </thead>
        <tbody>
          {showList()}
        </tbody>
      </table>
    </div>
  );
}

