"use client"
import React from 'react'
import {Button} from "../ui/button"
import useStore from '@/store/useStore'
const Btn = () => {
  const setShow = useStore((state)=>state.setShowForm)
  return (
<Button onClick={setShow}>Show</Button>
  )
}

export default Btn