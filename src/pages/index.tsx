import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
const Home: NextPage = () => {
  const { data, status } = useSession();
  return (
    <div>
      {!data?.user ? (
        <button
          onClick={() => {
            signIn("github");
          }}
        >
          Sign In
        </button>
      ) : (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
      <div>{status}</div>
    </div>
  );
};

export default Home;
