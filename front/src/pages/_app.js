import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";

export default function App({ Component, pageProps }) {
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
