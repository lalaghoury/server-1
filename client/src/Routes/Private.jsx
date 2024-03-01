import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ Component, ...props }) {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      const verifyToken = async () => {
        try {
          setLoading(true);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${auth.token}`;
          const response = await axios.get("/api/verify");
          setOk(response.data.ok);
          setLoading(false);
        } catch (error) {
          console.error("Verification failed:", error);
          setLoading(false);
        }
      };
      verifyToken();
    }
  }, [auth?.token, navigate]);

  if (loading) return null;

  if (!ok) return <Spinner />;

  return <Component {...props} />;
}
