import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (
      !["/", "/chat", "/chat/[id]", "/contents", "/settings"].includes(
        router.pathname
      )
    ) {
      router.replace("/");
    }
  });
  return (
    <main id="container" className="relative py-[60px]">
      <Header />
      <div className="max-w-[430px] w-full h-full mx-auto bg-white">
        <Component className="p-4" {...pageProps} />
      </div>
      <Navigation />
    </main>
  );
}
