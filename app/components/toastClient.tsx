import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default function ToastClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <Toast />;
}
