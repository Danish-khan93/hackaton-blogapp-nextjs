import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/component/NavBar";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
