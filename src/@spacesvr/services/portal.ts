import axios from "axios";
import { useEffect, useState } from "react";
import { fetchAccount } from "services/instagram";
import { Portal } from "../core";

const BACKEND_ROUTE = process.env.NEXT_PUBLIC_BACKEND_ROUTE;

type PortalHookResponse = {
  result?: Portal;
  error?: string;
};

/**
 * Hook to fetch portal from backend gien an ID.
 *
 * If it finds an instagram username it will make network call to fetch instagram
 *
 * Will build assets from network fetch into a modified version of object
 * using the passed in builder function (optional)
 *
 * @param id
 * @param portalBuilder
 */
export const usePortal = (
  id: string,
  portalBuilder?: (portalResult: Portal) => Portal
): PortalHookResponse => {
  const [result, setResult] = useState<Portal>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const localResult: Portal = {};

      // fetch portal
      try {
        const portalResult = await axios.post(`${BACKEND_ROUTE}/fetch`, { id });
        Object.assign(localResult, portalResult.data);
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
      const instagramUsername = localResult.instagramUsername;
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

  const builtResult = portalBuilder && result ? portalBuilder(result) : result;

  return { result: builtResult, error };
};
