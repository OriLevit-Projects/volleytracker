import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  MenuItem,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

function Signup() {
  const navigate = useNavigate();
  const { signup, error: authError, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    teamName: '',
    position: '',
    jerseyNumber: ''
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const teams = [
    { id: 1, name: 'Blich' },
  ];

  const positions = [
    'Outside Hitter',
    'Opposite',
    'Setter',
    'Middle Blocker',
    'Libero'
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return !value ? 'Email is required' 
          : !/\S+@\S+\.\S+/.test(value) ? 'Please enter a valid email'
          : '';
      case 'password':
        return !value ? 'Password is required'
          : value.length < 6 ? 'Password must be at least 6 characters'
          : '';
      case 'confirmPassword':
        return !value ? 'Please confirm your password'
          : value !== formData.password ? 'Passwords do not match'
          : '';
      case 'jerseyNumber':
        return !value ? 'Jersey number is required'
          : value < 0 || value > 99 ? 'Jersey number must be between 0 and 99'
          : '';
      default:
        return !value ? `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1')} is required` : '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    // Check if there are any errors
    if (Object.values(newErrors).every(error => !error)) {
      try {
        await signup(formData);
        navigate('/'); // Redirect to home page after successful signup
      } catch (err) {
        console.error('Signup failed:', err);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4, 
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            color: theme => theme.palette.primary.main 
          }}
        >
          Sign Up
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          color="textSecondary" 
          sx={{ mb: 4 }}
        >
          Create your account to start tracking volleyball statistics
        </Typography>

        {authError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {authError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                name="teamName"
                label="Select Team"
                fullWidth
                required
                value={formData.teamName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.teamName && Boolean(errors.teamName)}
                helperText={touched.teamName && errors.teamName}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.name}>
                    {team.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="position"
                label="Position"
                fullWidth
                required
                value={formData.position}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.position && Boolean(errors.position)}
                helperText={touched.position && errors.position}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              >
                {positions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jerseyNumber"
                label="Jersey Number"
                type="number"
                fullWidth
                required
                inputProps={{ min: 0, max: 99 }}
                value={formData.jerseyNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.jerseyNumber && Boolean(errors.jerseyNumber)}
                helperText={touched.jerseyNumber && errors.jerseyNumber}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 2,
                  borderRadius: '12px',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                  }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link 
              component={RouterLink} 
              to="/login"
              sx={{ 
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              Log in here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;