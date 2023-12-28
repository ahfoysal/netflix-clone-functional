
import Header from "@/components/layout/Header";
import "./globals.css";
import { Providers } from "./providers";
import { headers } from "next/headers";


export default  function RootLayout({ children }) {

  const headersList = headers()
    const pathname = headersList.get('x-pathname');


console.log(pathname)
  return (
    <html className="dark">
      
      <body suppressHydrationWarning={true}>
       <Providers>
   
     {children}</Providers>
   
      </body>
    </html>
  );
}
