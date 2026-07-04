import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ChatIcon from '@mui/icons-material/Chat';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import BrandLogo from '../components/BrandLogo';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import '../App.css';

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false)

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <>
            <Grid container component="main" sx={{ minHeight: '100vh' }}>
                <Grid item xs={false} sm={5} md={7} className="authSidePanel">
                    <BrandLogo light size="lg" />
                    <Typography variant="h5" fontWeight={700} textAlign="center" sx={{ maxWidth: 340 }}>
                        Video calls made simple
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.65, textAlign: 'center', maxWidth: 360 }}>
                        Sign in to save your meeting history and start calls instantly.
                    </Typography>
                    <div className="authFeatureList">
                        <div className="authFeatureItem">
                            <VideocamIcon /> HD video & audio
                        </div>
                        <div className="authFeatureItem">
                            <ScreenShareIcon /> One-click screen sharing
                        </div>
                        <div className="authFeatureItem">
                            <ChatIcon /> Built-in chat
                        </div>
                        <div className="authFeatureItem">
                            <LockIcon /> Secure login
                        </div>
                    </div>
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={5}
                    component={Paper}
                    elevation={0}
                    square
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f4f6fb' }}
                >
                    <Box sx={{ mx: 4, width: '100%', maxWidth: 400, py: 4 }}>
                        <Typography variant="h5" fontWeight={800} letterSpacing="-0.02em">
                            {formState === 0 ? 'Welcome back' : 'Create account'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 0.5 }}>
                            {formState === 0 ? 'Sign in to your Prime Call account' : 'Get started in seconds'}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 0.5, mb: 2.5, bgcolor: '#e2e8f0', borderRadius: 2.5, p: 0.5 }}>
                            <Button
                                fullWidth
                                variant={formState === 0 ? "contained" : "text"}
                                onClick={() => { setFormState(0); setError("") }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant={formState === 1 ? "contained" : "text"}
                                onClick={() => { setFormState(1); setError("") }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Sign In" : "Create Account"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
