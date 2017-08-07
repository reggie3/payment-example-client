const URL = `https://o2ouqqruk2.execute-api.us-east-1.amazonaws.com/prod`;

export  const inventory = ()=>{
    return  fetch(URL + '/inventory',{
        method: 'GET'
    })
    .then((res)=>{
        let json =  res.json();
        console.log(json);
        return json;
    });
    
}