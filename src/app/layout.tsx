import { UserProvider } from "@/contexts/userContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <UserProvider>
                <body>{children}</body>
            </UserProvider>
        </html>
    );
}
