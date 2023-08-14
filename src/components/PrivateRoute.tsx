import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

/**
 * @function PrivateRoute - Returns the component or the signup page.
 * @param children - Children of the JSX component.
 * @returns - children if the user is authenticated or Navigate function that redirects to signup '/'

 */
export default function PrivateRoute({ children }: Props) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}
