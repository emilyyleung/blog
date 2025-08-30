import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const page = parseInt(
    new URL(request.url).searchParams.get("page") || "1",
    10
  );
  const pageSize = parseInt(
    new URL(request.url).searchParams.get("pageSize") || "10",
    10
  );

  const allPosts = await getCollection("projects");
  const sortedPosts = allPosts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const paginatedPosts = await Promise.all(
    sortedPosts.slice(start, end).map(async (post) => {
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
};
