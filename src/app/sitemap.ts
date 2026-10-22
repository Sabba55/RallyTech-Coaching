import type { MetadataRoute } from "next";
import { URL_SITIO } from "@/utils/sitio";

// Es una landing de una sola página: el sitemap lista únicamente la raíz
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${URL_SITIO}/` }];
}