import { getCollection, render } from "astro:content";

export async function GET({ url }: { url: URL }) {
  const posts = await getCollection("projects");
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const paginatedPosts = await Promise.all(
    sortedPosts.map(async (post) => {
      return {
        slug: post.slug,
        project: post.data.project,
        title: post.data.title,
        date: post.data.date,
        html: post.rendered?.html,
      };
    })
  );

  return new Response(JSON.stringify(paginatedPosts), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
