import React from 'react'
import gear from "../assets/loading.gif";
const Loading = () => {
  return (
    <div><img className="fixed bottom-0 right-0" src={gear} alt="" width={80} /></div>
  )
}

export default Loading