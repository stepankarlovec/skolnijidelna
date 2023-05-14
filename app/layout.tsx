import Navbar from "./components/navbar";
import './globals.css';

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="cs">
        <body>
        <Navbar></Navbar>
        <div className="mx-5 my-5">
            {children}
        </div>
        </body>
        </html>
    );
}