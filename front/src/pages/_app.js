import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main id="container">
      <Component {...pageProps} />
    </main>
  );
}
