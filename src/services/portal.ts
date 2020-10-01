import axios from "axios";
import { useEffect, useState } from "react";
import { fetchAccount } from "services/instagram";

const BACKEND_ROUTE = process.env.NEXT_PUBLIC_BACKEND_ROUTE;

const API_URL = `${BACKEND_ROUTE}/fetch`;

export type PortalResult = {
  portal?: any;
  instagram?: any;
};

type PortalHookResponse = {
  result?: PortalResult;
  error?: string;
};

export const usePortal = (id: string): PortalHookResponse => {
  const [result, setResult] = useState<PortalResult>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const localResult: PortalResult = {};

      try {
        const portalResult = await axios.post(API_URL, { id });
        localResult.portal = portalResult.data;
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

      // fetch instagram
      const instagramUsername = localResult?.portal?.instagramUsername;
      if (instagramUsername) {
        try {
          const instagramResponse = await fetchAccount(instagramUsername);
          localResult.instagram = instagramResponse;
        } catch (err) {
          console.error(`Failed to fetch @${instagramUsername}`);
        }
      }

      setResult(localResult);
    };

    if (!result && !error) {
      fetchData();
    }
  }, [result, error]);

  return { result, error };
};
