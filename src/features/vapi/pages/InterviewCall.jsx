import React from 'react'
import Agent from '../components/Agent'
import Header from '../../auth/components/Header'

function InterviewCall() {
  return (
    <>
    <Header />
    <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", marginTop: "20px"}}>
      <Agent apiKey={import.meta.env.VITE_PUBLIC_VAPI_WEB_TOKEN} 
  assistantId={import.meta.env.VITE_PUBLIC_VAPI_ASSISTANT_ID} />
    </div>
    </>
  )
}

export default InterviewCall
