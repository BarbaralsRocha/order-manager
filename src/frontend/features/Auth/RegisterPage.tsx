// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Link,
//   Alert,
// } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../../commons/redux/slices/authSlice';

// const RegisterPage: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [register] = useRegisterMutation();
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const { confirmPassword, ...registerData } = formData;
//       const result = await register(registerData).unwrap();
//       dispatch(setCredentials(result));
//       navigate('/');
//     } catch (err: any) {
//       setError(err.data?.error || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           Register
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
//             {error}
//           </Alert>
//         )}

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             id="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Register
//           </Button>
//           <Box sx={{ textAlign: 'center' }}>
//             <Link href="/login" variant="body2">
//               Already have an account? Sign in
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default RegisterPage;
