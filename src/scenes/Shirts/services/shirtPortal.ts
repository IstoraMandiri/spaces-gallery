/**
 * Given data from portal, will rebuild result to match shirt portal needs
 *
 * - adds videos and images from instagram
 *
 * @param portalResult
 */
export const buildShirtPortal = (portalResult: Portal): Portal => {
  const { firstName, instagram } = portalResult;

  // rebuild base assets
  const assets: Asset[] = [];
  if (portalResult.assets) {
    portalResult.assets.map((ass: Asset) => assets.push(ass));
  }

  // build assets from instagram
  if (instagram) {
    // get profile picture
    const profilePic = instagram.profile_pic_url_hd;
    assets.push({
      url: profilePic,
      type: "image",
      metadata: { profilePic: true },
    });

    // get media
    const media = instagram.edge_owner_to_timeline_media.edges;
    if (media.length) {
      aggregateInstagramAssets(assets, media);
    }
  }

  // calc seed
  const seed = instagram ? instagram.id : getNumFromString(firstName);

  console.log(`seed: ${seed}`);

  return { ...portalResult, assets, seed };
};

/**
 * Find assets in instagram array and give proper types + some metadata
 * @param assets - assets array to push to
 * @param edges - edge array of assets to look through (could be sidecar)
 * @param parentNode - base node in case of sidecar (used recursively)
 */
const aggregateInstagramAssets = (
  assets: Asset[],
  edges: any[],
  parentNode?: any
) => {
  edges.map((edge) => {
    const node = edge.node;

    const getMetadata = (thisNode: any) => ({
      likes: thisNode.edge_media_preview_like.count,
      comments: thisNode.edge_media_to_comment.count,
    });

    if (node.__typename === "GraphVideo") {
      assets.push({
        url: node.video_url,
        type: "video",
        metadata: getMetadata(parentNode || node),
      });
    } else if (node.__typename === "GraphImage") {
      assets.push({
        url: node.display_url,
        type: "image",
        metadata: getMetadata(parentNode || node),
      });
    } else if (node.__typename === "GraphSidecar") {
      aggregateInstagramAssets(
        assets,
        node.edge_sidecar_to_children.edges,
        node
      );
    }
  });
};

// returns a number hashed from the input string
const getNumFromString = (input: string) => {
  let hash = 0,
    i,
    chr;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
