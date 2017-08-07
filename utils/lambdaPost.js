const URL = `https://o2ouqqruk2.execute-api.us-east-1.amazonaws.com/prod`;

export  const purchase = ()=>{
    return  fetch(URL + '/purchases',{
        method: 'POST',
        body:JSON.stringify({
            test: 'string'
        })
    })
    .then((res)=>{
        return res.json();
    });
    
}