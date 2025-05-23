"use client"
import { MyCalendar } from "@/components/MyCalendar"
import React, { useState } from "react"

const Calander = () => {
  const [events, setEvents] = useState([
    {
      title: "Mario – Fade",
      start: new Date(),
      end: new Date(new Date().getTime() + 30 * 60 * 1000),
    },
  ])
  return (
    <div className="w-full p-20">
      <MyCalendar events={events} setEvents={setEvents} />
    </div>
  )
}

export default Calander
