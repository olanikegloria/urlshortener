import { createAsyncThunk } from "@reduxjs/toolkit";
import { createShortUrl, generateQrCode } from "../services/api";

export const shortenUrl = createAsyncThunk(
    "url/shortenUrl",
    async (
      { longUrl, shortUrl }: { longUrl: string; shortUrl: string },
      { rejectWithValue }
    ) => {
      try {
        const data = await createShortUrl(longUrl, shortUrl);
        return data.shortUrl;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
export const getQrCode = createAsyncThunk(
  "url/getQrCode",
  async (shortUrl: string, { rejectWithValue }) => {
    try {
      const data = await generateQrCode(shortUrl);
      return data;
    } catch (error) {
      return rejectWithValue("failed to generate qrcode");
    }
  }
);
