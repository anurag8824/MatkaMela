
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Input,
  FormControl,
} from '@mui/material';
import TrendingGallery from '../Components/Content/TrendingProduct';
import DrawerGallery from '../Components/Content/DrawerGallery';
import RotatingDiv from './RotatingDiv';


const ProductPage = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: '',
        phone: '',
        file: null,
      });
    
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: files ? files[0] : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          data.append(key, value);
        });
        console.log('Submitting data:', formData);
    
        try {
          const response = await fetch('http://localhost:8000/api/msme-submit', {
            method: 'POST',
            body: data,
          });
    
          const result = await response.json();
          alert(result.message || 'Form submitted successfully!');
        } catch (error) {
          console.error('Error:', error);
          alert('Error submitting the form');
        }
      };

   
  return (
    <div>
    <Typography
  variant="h6"
  sx={{
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #4caf50, #81c784)',
    color: '#fff',
    p: 2,
    borderRadius: 2,
    mb: 3,
    boxShadow: 3,
  }}
>
  🌾 जनमित्र उद्योग — आपके शुद्ध, सात्विक और आवश्यक जीवनोपयोगी उत्पादों को पूरे भारत तक पहुँचाने की एक पहल!
</Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: 'auto',
        p: 4,
        boxShadow: 4,
        borderRadius: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight="bold">
        MSME उद्यमी अपने उत्पाद की लिस्टिंग जनमित्र में करने के लिए अपने विवरण भेजें |
      </Typography>

      <TextField
        fullWidth
        required
        margin="normal"
        label="उद्यम का नाम"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        required
        type="email"
        margin="normal"
        label="रजिस्ट्रेशन (ईमेल)"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        margin="normal"
        label="उत्पाद विवरण"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        required
        margin="normal"
        label="उत्पाद शीर्षक"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        required
        margin="normal"
        label="सपर्क नंबर"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel shrink htmlFor="file-upload">
          अपलोड प्रोडक्ट डिटेल्स
        </InputLabel>
        <Input
          id="file-upload"
          name="file"
          type="file"
          onChange={handleChange}
          required
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 4,
          background: 'linear-gradient(90deg, #2196f3, #21cbf3)',
          borderRadius: 2,
          px: 4,
          py: 1.5,
          fontWeight: 'bold',
        }}
      >
        Send Now
      </Button>
    </Box>
      

      <DrawerGallery/>


   

 
    </div>
// {/* <RotatingDiv /> */}
  )
}

export default ProductPage

