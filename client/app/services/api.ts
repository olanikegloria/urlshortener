import axios from "axios";

// Use different baseURL based on environment
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000',
});

export const createShortUrl = async(longUrl: string, shortUrl: string)=>{
    try {
        const response = await api.post('/create', {longUrl, shortUrl});
        return response.data;
    } catch (error: any) {
        console.error('Error creating short URL:', error);
        throw new Error(error.response?.data?.error || 'Failed to create short URL');
    }
}

export const generateQrCode = async(shortUrl: string) => {
    try {
        const response = await api.get(`/${shortUrl}/qrcode`);
        return response.data;
    } catch (error: any) {
        console.error('Error generating QR code:', error);
        throw new Error(error.response?.data?.error || 'Failed to generate QR code');
    }
}