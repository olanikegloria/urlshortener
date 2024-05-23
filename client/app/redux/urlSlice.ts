import { createSlice} from "@reduxjs/toolkit";
import { shortenUrl, getQrCode } from "./urlthunk";
import { UrlState } from "../services/utilities";

const initialState: UrlState = {
  longUrl: "",
  shortUrl: "",
  qrCode: "",
  loading: false,
  error: null,
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setLongUrl: (state, action) => {
      state.longUrl = action.payload;
    },
    setShortUrl: (state, action) => {
      state.shortUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrl = action.payload;
        if (!state.qrCode) {
          state.qrCode = "";
        }
        state.error = null;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getQrCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQrCode.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCode = action.payload;
      })
      .addCase(getQrCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLongUrl, setShortUrl } = urlSlice.actions;
export default urlSlice.reducer;
