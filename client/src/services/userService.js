import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_USER, LOGIN, ME } from "../queries/userQueries";

const [createUser] = useMutation(CREATE_USER);

const [loginUser] = useMutation(LOGIN);

const [initUser] = useQuery(ME);

export default { createUser, loginUser, initUser };
