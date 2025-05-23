"use client"
import { useState } from "react"
import { Calendar, dateFnsLocalizer, SlotInfo } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale"
import "react-big-calendar/lib/css/react-big-calendar.css"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export interface Event {
  title: string
  start: Date
  end: Date
}

interface FormData {
  name: string
  service: string
  start: Date | null
  end: Date | null
}

interface MyCalendarProps {
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
}

export const MyCalendar = ({ events, setEvents }: MyCalendarProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    service: "",
    start: null,
    end: null,
  })

  const [open, setOpen] = useState(false)

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setFormData({
      name: "",
      service: "",
      start: slotInfo.start,
      end: slotInfo.end,
    })
    setOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.start && formData.end) {
      setEvents([
        ...events,
        {
          title: `${formData.name} – ${formData.service}`,
          start: formData.start,
          end: formData.end,
        },
      ])
      setOpen(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <DialogContent>...</DialogContent>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              placeholder="Service (e.g. Fade, Beard Trim)"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              required
            />
            <DialogFooter>
              <Button type="submit">Confirm Appointment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSlotSelect}
      />
    </div>
  )
}
