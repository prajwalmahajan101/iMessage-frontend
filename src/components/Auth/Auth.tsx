import { FC, useState } from "react";

import { Session } from "next-auth";
import { useMutation } from "@apollo/client";
import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

import UserOperations from "@/graphql/operations/user";
import {
  ICreateUsernameResult,
  ICreateUsernameVariable,
} from "@/graphql/Interfaces/user";
import { toastError, toastSuccess } from "@/utils/helpers/toast";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState<string>("");
  const [createUserName, { loading, error }] = useMutation<
    ICreateUsernameResult,
    ICreateUsernameVariable
  >(UserOperations.Mutations.createUsername);

  const handleSave = async () => {
    if (!username) return;
    try {
      const { data } = await createUserName({ variables: { username } });

      if (!data?.createUsername) {
        toastError("Some Error occurred while creating/updating username");
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;
        toastError(error);
        throw new Error(error);
      }

      toastSuccess("Username successfully created/updated");

      reloadSession();
    } catch (err) {
      console.log("Error while creating/updating username");
    }
  };

  return (
    <Center height={"100vh"}>
      <Stack align={"center"} spacing={8}>
        {session ? (
          <>
            <Text>Create a Username</Text>
            <Input
              placeholder={"Enter a username"}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Button onClick={handleSave}> Save</Button>
          </>
        ) : (
          <>
            <Text fontSize={"3xl"}>iMessengerQL</Text>
            <Button
              onClick={() => {
                signIn("google");
              }}
              leftIcon={
                <Image
                  height={"20px"}
                  src={"/images/googlelogo.png"}
                  alt="Google Logo"
                />
              }
            >
              Continue with Google
            </Button>
            <Button
              onClick={() => {
                signIn("github");
              }}
              leftIcon={
                <Image
                  height={"20px"}
                  src={"/images/githublogo.png"}
                  alt="Github Logo"
                />
              }
            >
              Continue with Github
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};
export default Auth;
