import { useEffect, useState } from "react";

export default function Storage(name,initialvalue){
    const [local,setLocal] = useState(initialvalue)

  
    
    useEffect(() => {
        const existingData = JSON.parse(localStorage.getItem(name))

        if(existingData){
            setLocal(existingData)
        }else {
            localStorage.setItem(name,JSON.stringify(initialvalue))
            setLocal(initialvalue)
        }

    },[])

    const updateLocalstorage = (newData) => {
        if(typeof newData === 'function'){
            localStorage.setItem(name,JSON.stringify(newData(local)))
        } else {
            localStorage.setItem(name,JSON.stringify(newData))

        }
        setLocal(newData)
    }
    

    return [local,updateLocalstorage]

}