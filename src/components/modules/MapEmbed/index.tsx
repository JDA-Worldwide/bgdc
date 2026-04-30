import { stegaClean } from "@sanity/client/stega";
import SanityImage from "@/components/ui/SanityImage";
import Container from "@/components/ui/Container";
import type { MapEmbedProps } from "./types";

export default function MapEmbed({ type, embedUrl, image, width }: MapEmbedProps) {
  const mapType = stegaClean(type);
  const mapWidth = stegaClean(width);

  const showEmbed = mapType === "embed" && embedUrl;
  const showImage = mapType === "image" && image?.asset;

  if (!showEmbed && !showImage) return null;

  const isFullWidth = mapWidth === "full";

  const inner = showEmbed ? (
    <div className="relative aspect-video overflow-hidden rounded">
      <iframe
        src={embedUrl}
        className="absolute inset-0 h-full w-full"
        allowFullScreen
        title="Map embed"
        loading="lazy"
      />
    </div>
  ) : (
    <div className="relative min-h-[320px] overflow-hidden rounded">
      <SanityImage
        image={image!}
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );

  if (isFullWidth) {
    return (
      <div className="-mx-[calc((100vw-100%)/2)] w-screen">
        {inner}
      </div>
    );
  }

  return <Container>{inner}</Container>;
}
