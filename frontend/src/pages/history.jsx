import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import { IconButton } from '@mui/material';
import AppNavbar from '../components/AppNavbar';
import "../App.css";

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    return (
        <div className="appShell">
            <AppNavbar>
                <IconButton onClick={() => routeTo("/home")} color="primary" size="small">
                    <HomeIcon />
                </IconButton>
                <span className="navLink" onClick={() => routeTo("/home")}>Home</span>
            </AppNavbar>

            <div className="pageContent">
                <div className="pageHeader">
                    <h1>Meeting history</h1>
                    <p>Meetings you've joined recently.</p>
                </div>

                {meetings.length !== 0 ? (
                    <div className="historyList">
                        {meetings.map((e, i) => (
                            <Card key={i} variant="outlined">
                                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '1.25rem !important' }}>
                                    <div>
                                        <span className="meetingCodePill">{e.meetingCode}</span>
                                        <Typography sx={{ fontSize: '0.85rem', mt: 0.75 }} color="text.secondary">
                                            {formatDate(e.date)}
                                        </Typography>
                                    </div>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => routeTo(`/${e.meetingCode}`)}
                                    >
                                        Rejoin
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="historyEmpty">
                        <HistoryIcon />
                        <p>No meetings yet. Start or join a call from the home page.</p>
                        <Button variant="contained" sx={{ mt: 2 }} onClick={() => routeTo("/home")}>
                            Go to Home
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
