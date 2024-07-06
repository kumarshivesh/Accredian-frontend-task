import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  referrerName: Yup.string().required('Required'),
  referrerEmail: Yup.string().email('Invalid email address').required('Required'),
  refereeName: Yup.string().required('Required'),
  refereeEmail: Yup.string().email('Invalid email address').required('Required'),
});

const ReferEarn = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const formik = useFormik({
    initialValues: {
      referrerName: '',
      referrerEmail: '',
      refereeName: '',
      refereeEmail: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${apiUrl}/api/referrals`, values);
        console.log(response.data);
        alert('Referral submitted successfully!');
        handleClose();
      } catch (error) {
        console.error('There was an error submitting the form!', error);
        alert('Failed to submit referral');
      }
    },
  });

  return (
    <div style={styles.hero}>
      <Typography variant="h1" color="primary">Refer & Earn</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Refer Now
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modal}>
          <Typography variant="h6" component="h2">Refer a Friend</Typography>
          <form style={styles.form} onSubmit={formik.handleSubmit}>
            <TextField
              label="Your Name"
              fullWidth
              required
              margin="normal"
              id="referrerName"
              name="referrerName"
              value={formik.values.referrerName}
              onChange={formik.handleChange}
              error={formik.touched.referrerName && Boolean(formik.errors.referrerName)}
              helperText={formik.touched.referrerName && formik.errors.referrerName}
            />
            <TextField
              label="Your Email"
              type="email"
              fullWidth
              required
              margin="normal"
              id="referrerEmail"
              name="referrerEmail"
              value={formik.values.referrerEmail}
              onChange={formik.handleChange}
              error={formik.touched.referrerEmail && Boolean(formik.errors.referrerEmail)}
              helperText={formik.touched.referrerEmail && formik.errors.referrerEmail}
            />
            <TextField
              label="Friend's Name"
              fullWidth
              required
              margin="normal"
              id="refereeName"
              name="refereeName"
              value={formik.values.refereeName}
              onChange={formik.handleChange}
              error={formik.touched.refereeName && Boolean(formik.errors.refereeName)}
              helperText={formik.touched.refereeName && formik.errors.refereeName}
            />
            <TextField
              label="Friend's Email"
              type="email"
              fullWidth
              required
              margin="normal"
              id="refereeEmail"
              name="refereeEmail"
              value={formik.values.refereeEmail}
              onChange={formik.handleChange}
              error={formik.touched.refereeEmail && Boolean(formik.errors.refereeEmail)}
              helperText={formik.touched.refereeEmail && formik.errors.refereeEmail}
            />
            <Button type="submit" variant="contained" color="primary" style={styles.submitButton}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const styles = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 8,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  submitButton: {
    marginTop: 16,
  },
};

export default ReferEarn;
