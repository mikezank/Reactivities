import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

interface Props {
    activity?: Activity
    closeForm: () => void
}

export function ActivityForm({ activity, closeForm }: Props) {
    const { updateActivity, createActivity } = useActivities()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget)
        const data: {[key: string]: FormDataEntryValue} = {}
        formData.forEach((value, key) => {
            data[key] = value
        })

        console.log('activity =', activity)
        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity)
            closeForm()
        } else {
            await createActivity.mutateAsync(data as unknown as Activity)
            closeForm()
        }
    }

    function formattedActivityDate(activity?: Activity) {
        const date = activity ? new Date(activity.date) : new Date()
        return date ? date.toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0]
    }

    return <Paper sx={{ borderRadius: 3, padding: 3}}>
        <Typography variant="h5" gutterBottom color="primary">
            Create activity
        </Typography>
        <Box component='form' onSubmit={handleSubmit} display='flex' flexDirection='column' gap={3}>
            <TextField name='title' label='Title' defaultValue={activity?.title} />
            <TextField name='description' label='Description' multiline rows={3} defaultValue={activity?.description} />
            <TextField name='category' label='Category' defaultValue={activity?.category}/>
            <TextField name='date' label='Date' type="date" defaultValue={formattedActivityDate(activity)}/>
            <TextField name='city' label='City' defaultValue={activity?.city} />
            <TextField name='venue' label='Venue' defaultValue={activity?.venue} />
            <Box display='flex' justifyContent='end' gap={3}>
                <Button color="inherit" onClick={closeForm}>Cancel</Button>
                <Button color="success" type="submit" variant="contained" 
                    disabled={updateActivity.isPending || createActivity.isPending}>
                    Submit
                </Button>
            </Box>
        </Box>
    </Paper>
}