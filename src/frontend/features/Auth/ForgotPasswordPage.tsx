// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Alert,
//   Link,
// } from '@mui/material';
// import { useForgotPasswordMutation } from '../../commons/redux/services/authApi';

// const ForgotPasswordPage: React.FC = () => {
//   const [forgotPassword] = useForgotPasswordMutation();
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess(false);

//     try {
//       await forgotPassword({ email }).unwrap();
//       setSuccess(true);
//     } catch (err) {
//       setError(
//         (err as { data?: { error: string } })?.data?.error ||
//           'Failed to process request. Please try again.',
//       );
//     }
//   };

//   if (success) {
//     return (
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
//             If an account exists with this email, you will receive password
//             reset instructions shortly.
//           </Alert>
//           <Link href="/login" variant="body2">
//             Return to login
//           </Link>
//         </Box>
//       </Container>
//     );
//   }

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
//           Reset Password
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
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Send Reset Link
//           </Button>
//           <Box sx={{ textAlign: 'center' }}>
//             <Link href="/login" variant="body2">
//               Remember your password? Sign in
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ForgotPasswordPage;
