import type { AppProps } from "next/app";
import supabase from "../lib/supabaseClient";
import "@/app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, session };
};

export default MyApp;
