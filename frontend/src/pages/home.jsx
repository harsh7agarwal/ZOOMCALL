import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import AppNavbar from '../components/AppNavbar';
import { AuthContext } from '../contexts/AuthContext';
import { generateMeetingCode } from '../utils/meetingCode';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode.trim())
        navigate(`/${meetingCode.trim()}`)
    }

    let handleStartMeeting = async () => {
        const code = generateMeetingCode();
        await addToUserHistory(code);
        navigate(`/${code}`);
    }

    return (
        <div className="appShell">
            <AppNavbar>
                <IconButton onClick={() => navigate("/history")} color="primary" size="small">
                    <RestoreIcon />
                </IconButton>
                <span className="navLink" onClick={() => navigate("/history")}>History</span>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    startIcon={<LoginIcon />}
                    onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}
                >
                    Logout
                </Button>
            </AppNavbar>

            <div className="pageContent">
                <div className="pageHeader">
                    <h1>Your meetings</h1>
                    <p>Start a new call or join one with a code.</p>
                </div>

                <div className="homeGrid">
                    <div className="actionCard">
                        <div className="actionCardIcon start">
                            <AddIcon />
                        </div>
                        <h2>Start a meeting</h2>
                        <p>Create a new room and share the link with anyone you want to call.</p>
                        <Button variant="contained" fullWidth onClick={handleStartMeeting}>
                            New Meeting
                        </Button>
                    </div>

                    <div className="actionCard">
                        <div className="actionCardIcon join">
                            <LoginIcon />
                        </div>
                        <h2>Join a meeting</h2>
                        <p>Enter the code shared with you to join an ongoing call.</p>
                        <div className="joinForm">
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleJoinVideoCall()}
                                label="Meeting code"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />
                            <Button
                                onClick={handleJoinVideoCall}
                                variant='contained'
                                sx={{ px: 2.5, whiteSpace: 'nowrap', minHeight: 40 }}
                            >
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(HomeComponent)
