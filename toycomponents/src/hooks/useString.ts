import { useEffect, useState } from "react";
import stringService from "../services/string-service";
import { CanceledError } from "../services/api-client";


const useString = () =>{
    const [string, setString] = useState<string[]>([]);
    const [strError, setStrError] = useState("");
    const [strIsLoading, setStrLoading] = useState(false);
  
    useEffect(() => {
      setStrLoading(true);
  
      const { request, cancel } = stringService.getAll<string>();
      request
        .then((res) => {
          setString(res.data);
          setStrLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setStrError(err.message);
          setStrLoading(false);
        });
  
      return () => cancel();
    }, []);

    return { string, strError, strIsLoading, setString, setStrError};
}

export default useString;
