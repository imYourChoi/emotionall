import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import "@/styles/globals.css";
import EmotionContextProvider from "@/contexts/emotionContext";
import UserContextProvider from "@/contexts/userContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (
      ![
        "/landing",
        "/",
        "/chat",
        "/chat/[id]",
        "/contents",
        "/settings",
      ].includes(router.pathname)
    ) {
      router.replace("/");
    }
  });
  return (
    <UserContextProvider>
      <EmotionContextProvider>
        <div id="container" className="flex items-center justify-center">
          <main className="relative w-full max-w-[430px] h-screen">
            <Header />
            <div className="w-full h-screen max-h-screen overflow-y-auto mx-auto bg-white py-[60px]">
              <Component {...pageProps} />
            </div>
            <Navigation />
          </main>
        </div>
      </EmotionContextProvider>
    </UserContextProvider>
  );
}
