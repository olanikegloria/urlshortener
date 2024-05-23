import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createShortUrl = async(longUrl: string, shortUrl: string)=>{
    const response = await api.post('/create', {longUrl, shortUrl});
    return response.data;
}

export const generateQrCode = async(shortUrl: string) => {
    const response = await api.get(`/${shortUrl}/qrcode`)
    return response.data;
}