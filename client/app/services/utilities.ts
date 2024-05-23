export interface HomeProps {
    longUrl: string;
    shortUrl: string;
    qrCode: string;
    loading: boolean;
    error: string | null;
    handleLongUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShortUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleShorten: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFetchQrCode: () => void;
  }

export interface UrlState {
    longUrl: string;
    shortUrl: string;
    qrCode: string;
    loading: boolean;
    error: string | null;
}
