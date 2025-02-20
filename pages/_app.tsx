import { ThemeProvider } from "../context/ThemeContext";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter(); // Ambil router buat key animasi

  return (
    <ThemeProvider>
      <Layout>
        <AnimatePresence mode="wait"> 
          <PageTransition key={router.pathname}>
            <Component {...pageProps} />
          </PageTransition>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
