import { Box, Container, CssBaseline, Typography } from "@mui/material"
import { useState } from "react"
import { NavBar } from "./NavBar"
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard"
import { useActivities } from "../../lib/hooks/useActivities"

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const { activities, isPending } = useActivities()

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities!.find(x => x.id === id))
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

  return <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
    <CssBaseline />
    <NavBar openForm={handleOpenForm} />
    <Container maxWidth='lg' sx={{mt: 3}}>
      {!activities || isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        <ActivityDashboard 
        activities={activities} 
        selectActivity={handleSelectActivity}
        cancelSelectActivity={resetActivity}
        selectedActivity={selectedActivity}
        editMode={editMode}
        openForm={handleOpenForm}
        closeForm={handleFormClose}
      />
      )}
      
    </Container>
  </Box>
}

export default App
