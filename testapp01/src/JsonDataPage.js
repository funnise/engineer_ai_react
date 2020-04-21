import React, { useCallback, useState, useEffect } from 'react';
import useRouter from "use-react-router";

export const JsonDataPage =() =>{
　const [rowdata, setRowdata] = useState();
  const { history } = useRouter();
  const jsonData = JSON.stringify(history.location.state)
  console.log(jsonData)

  return (
    <div>
        <h1>JsonRowData</h1>
        <div>{jsonData}</div>
    </div>
  );
}

