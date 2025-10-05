"use cache";
import { unstable_cacheLife as cacheLife } from "next/cache";

export default async function Page() {
  cacheLife("weeks");
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
