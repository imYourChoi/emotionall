import Head from "next/head";
import Chatting from "@/components/chat/Chatting";

export default function Chat() {
  return (
    <>
      <Head>
        <title>Chatting</title>
      </Head>
      <Chatting />
    </>
  );
}
