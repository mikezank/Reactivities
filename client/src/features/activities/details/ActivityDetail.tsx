import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
    activity: Activity
    cancelSelectActivity: () => void
    openForm: (id: string) => void
}

export function ActivityDetail({ activity, cancelSelectActivity, openForm }: Props) {
    return <Card sx={{ borderRadius: 3}}>
        <CardMedia 
            component='img'
            src={`/images/categoryImages/${activity.category.toLowerCase()}.jpg`}
        />
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="subtitle1" fontWeight='light'>{activity.date}</Typography>
            <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
            <Button color="primary" onClick={() => openForm(activity.id)}>Edit</Button>
            <Button color="inherit" onClick={cancelSelectActivity}>Cancel</Button>
        </CardActions>
    </Card>
}