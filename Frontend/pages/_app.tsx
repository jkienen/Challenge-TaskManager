// Import modules
import "../styles/globals.css";
import "../styles/globalsvar.css";
import "../styles/tasks.css";


// Load /pages and custom props
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}