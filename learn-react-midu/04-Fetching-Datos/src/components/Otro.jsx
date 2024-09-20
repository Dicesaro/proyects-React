import { useCatImage } from "../hooks/useCatImage";

export function Otro() {
  const { imageUrl } = useCatImage({ fact: "Try !" });

  return <>{imageUrl && <img src={imageUrl} alt="" />}</>;
}
