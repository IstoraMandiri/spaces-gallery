import { PortalResult } from "services/portal";

type Asset = {
  url: string;
  type: "video" | "image" | "3d" | "text";
  metadata?: any;
};

type ShirtPortalReturn = {
  assets: any[];
};

export const shirtPortal = (portalResult: PortalResult): ShirtPortalReturn => {
  const { portal, instagram } = portalResult;

  // build assets
  const assets: Asset[] = [];
  if (portal.assets) {
    portal.assets.map((ass: Asset) => assets.push(ass));
  }
  if (instagram) {
    // get profile picture
    const profilePic = instagram.profile_pic_url_hd;
    assets.push({
      url: profilePic,
      type: "image",
      metadata: { profilePic: true },
    });

    // get

    // get media
    const media = instagram.edge_owner_to_timeline_media.edges;
    if (media.length) {
      aggregateInstagramAssets(assets, media);
    }
  }

  return { assets };
};

// find assets and format accordingly
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
