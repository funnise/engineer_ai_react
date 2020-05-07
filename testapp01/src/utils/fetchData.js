export const fetchData = async(pageNumber) => {
    const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`).catch((err) =>{
        throw err;
    })
    const result = await response.json();
    return { 
        id: pageNumber,
        list :result.hits
        };
}