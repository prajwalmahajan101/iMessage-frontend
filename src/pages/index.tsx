import type { NextPage, NextPageContext } from "next";

import { getSession, useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";

import Chat from "@/components/Chat/Chat";
import Auth from "@/components/Auth/Auth";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  return (
    <Box>
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};

export default Home;
