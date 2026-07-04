import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import AppNavbar from '../components/AppNavbar'
import VideocamIcon from '@mui/icons-material/Videocam'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import { generateMeetingCode } from '../utils/meetingCode'

export default function LandingPage() {
    const router = useNavigate();

    return (
        <div className='landingPage'>
            <AppNavbar light>
                <span className="navLink" onClick={() => router("/auth")}>Register</span>
                <button className="navBtnPrimary" onClick={() => router("/auth")}>Login</button>
            </AppNavbar>

            <section className="landingHero">
                <span className="heroBadge">Free video meetings</span>
                <h1>Stay close with <span>Prime Call</span></h1>
                <p>
                    Crystal-clear video calls with chat and screen sharing.
                    No downloads, no hassle — just open and connect.
                </p>

                <div className="heroActions">
                    <Link to="/auth" className="btnPrimary">Get Started</Link>
                    <button className="btnGhost" onClick={() => router(`/${generateMeetingCode()}`)}>
                        Join as Guest
                    </button>
                </div>

                <div className="featureGrid">
                    <div className="featureCard">
                        <VideocamIcon />
                        <h3>HD Video</h3>
                        <p>Sharp, real-time video for every call</p>
                    </div>
                    <div className="featureCard">
                        <ScreenShareIcon />
                        <h3>Screen Share</h3>
                        <p>Share your screen in one click</p>
                    </div>
                    <div className="featureCard">
                        <ChatIcon />
                        <h3>Live Chat</h3>
                        <p>Message while you talk</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
