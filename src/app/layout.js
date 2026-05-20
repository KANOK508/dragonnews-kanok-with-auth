import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
//  --- we add the dnf   for forcefully use the google dns server for resolving the domain names. this is important because sometimes the default dns server provided by the hosting provider may not be reliable or may have issues with resolving certain domain names. by setting the dns servers to google's public dns servers ( and we add it at the root folder file's layout.js for sever child )  we can ensure that our application can resolve domain names properly and avoid potential issues with dns resolution. this is especially important for applications that rely on external services or APIs, as they may need to resolve domain names to access those services. by using google's public dns servers, we can improve the reliability and performance of our application's dns resolution.
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Dragon News",
  description: "Best news portal in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={`h-full antialiased`}>
      <body className={`${poppins.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
