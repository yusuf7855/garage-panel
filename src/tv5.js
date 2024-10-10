import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import {useNavigate} from "react-router-dom";

function Tv5() {
    const BaseUrl = 'https://garage.btesisbul.com.tr';

    const [selectedFile, setSelectedFile] = useState(null);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    // Video seçme
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Video yükleme
    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Lütfen bir video seçin');
            return;
        }

        const formData = new FormData();
        formData.append('video', selectedFile);

        try {
            const response = await axios.post(`${BaseUrl}/upload/tv5`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data); // Yükleme sonucu
            fetchVideos(); // Yüklemeden sonra videoları güncelle
        } catch (error) {
            console.error('Video yükleme hatası:', error);
            alert('Video yükleme başarısız');
        }
    };

    // Mevcut videoları getir
    const fetchVideos = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/videos/tv5`);
            setVideos(response.data);
        } catch (error) {
            console.error('Videoları getirme hatası:', error);
        }
    };

    // Video silme
    const handleDelete = async (filename) => {
        try {
            const response = await axios.delete(`${BaseUrl}/videos/tv5/${filename}`);
            alert(response.data); // Silme sonucu
            fetchVideos(); // Silmeden sonra videoları güncelle
        } catch (error) {
            console.error('Video silme hatası:', error);
            alert('Video silme başarısız');
        }
    };

    // Component ilk yüklendiğinde videoları getir
    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Video Yükleme Paneli
            </Typography>

            <Paper elevation={3} style={{ padding: '25px' }}>
                <Grid container  alignItems="center">
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item spacing={2}>
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button variant="contained" color="primary" component="span">
                                    Dosya Seç
                                </Button>
                            </label>
                        </Grid>


                        {selectedFile && (
                            <Grid item>
                                <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                                    {selectedFile.name}
                                </Typography>
                            </Grid>
                        )}

                        <Grid item>
                            <Button
                                sx={{ marginLeft: '10px' }}
                                variant="contained" color="secondary"
                                onClick={handleUpload}
                            >
                                Videoyu Yükle
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
            <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
                Yüklü Videolar
            </Typography>
            <List>
                {videos.map((video, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={video} />
                        <ListItemSecondaryAction>
                            <Button variant="outlined" color="error" onClick={() => handleDelete(video)}>
                                SİL
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Button
                sx={{marginLeft: '10px'}}
                variant={"contained"}
                onClick={()=>{
                    navigate('/');
                }}
            >Tv1 e GEÇ</Button>
            <Button
                sx={{marginLeft: '10px'}}
                variant={"contained"}
                onClick={()=>{
                    navigate('/tv2');
                }}
            >Tv2 e GEÇ</Button>

            <Button
                variant={"contained"}
                sx={{marginLeft: '10px'}}
                onClick={()=>{
                    navigate('/tv3');
                }}
            >Tv3 e GEÇ</Button>
            <Button
                sx={{marginLeft: '10px'}}
                variant={"contained"}
                onClick={()=>{
                    navigate('/tv4');
                }}
            >Tv4 e GEÇ</Button>
            <Grid item >
                <Button
                    sx={{ marginTop: '10px' }}
                    variant={"outlined"}
                    onClick={() => {
                        window.location.href = 'https://garagestreet.com.tr/garage5';
                    }}
                >
                    Televizyon 5 i izle
                </Button>
            </Grid>
        </Container>
    );
}

export default Tv5;
