import React from 'react';
import useRouter from "use-react-router";

export const JsonDataPage =() =>{
  const { history } = useRouter();
  const jsonData = JSON.stringify(history.location.state);
  return (
    <div>
        <h1>JsonRowData</h1>
        <div>{jsonData}</div>
    </div>
  );
}

