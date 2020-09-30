import axios from "axios";
import { useEffect, useState } from "react";
import { fetchAccount } from "services/instagram";

const BACKEND_ROUTE = process.env.NEXT_PUBLIC_BACKEND_ROUTE;

const API_URL = `${BACKEND_ROUTE}/fetch`;

export const usePortal = (id: string): any => {
  const [result, setResult] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      let localResult;

      try {
        localResult = await axios.post(API_URL, { id });
        localResult = localResult.data;
      } catch (err) {
        setError(
          err.data?.message ||
            "Could not find portal. Please contact us if the problem persists"
        );
        return;
      }

      if (!localResult) {
        setError(
          "Could not find portal. Please contact us if the problem persists"
        );
        return;
      }

      if (localResult.instagramUsername) {
        try {
          const instagramResponse = await fetchAccount(
            localResult.instagramUsername
          );
          const igAssets = [{ url: "", type: null }]; // to be filled
          setResult({
            ...localResult,
            instagram: instagramResponse,
            assets: [...localResult.assets, ...igAssets],
          });
        } catch (err) {
          console.error(`Failed to fetch @${localResult.instagramUsername}`);
        }
      } else {
        setResult(localResult);
      }
    };

    if (!result && !error) {
      fetchData();
    }
  }, [result, error]);

  return { result, error };
};
