import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div id="container">
      <Component {...pageProps} />
    </div>
  );
}
