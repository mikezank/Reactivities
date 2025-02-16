import { Box, Container, CssBaseline } from "@mui/material"
import { useEffect, useState } from "react"
import axios from 'axios'
import { NavBar } from "./NavBar"
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard"

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function resetActivity() {
    setSelectedActivity(undefined)
  }

  function handleOpenForm(id?: string) {
    if (id) handleSelectActivity(id)
    else resetActivity()
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false)
  }

  function handleSubmitForm(activity: Activity) {
    if (activity.id) {
      setActivities(prev => prev.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = {...activity, id: activities.length.toString()}
      setSelectedActivity(newActivity)
      setActivities(prev => [...prev, newActivity])
    }
    setEditMode(false)
  }

  function handleDelete(id: string) {
    setActivities(prev => prev.filter(x => x.id !== id))
  }

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])

  return <Box sx={{ bgcolor: '#eeeeee' }}>
    <CssBaseline />
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth='lg' sx={{mt: 3}}>
      <ActivityDashboard 
        activities={activities} 
        selectActivity={handleSelectActivity}
        cancelSelectActivity={resetActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
        submitForm={handleSubmitForm}
        deleteActivity={handleDelete}
      />
    </Container>
  </Box>
}

export default App
