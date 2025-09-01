import { useState, useEffect } from "react";

export interface Post {
  slug: string;
  project: string;
  title: string;
  date: string;
  html: string;
}

export default function Feed({ pageSize = 5 }: { pageSize?: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(2);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/posts.json?page=${page}&pageSize=${pageSize}`)
      .then((res) => res.json())
      .then((newPosts: Post[]) => {
        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...newPosts]);
        }
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post, index) => {
          return (
            <article key={index}>
              <hr />
              <h2>{post.title}</h2>
              <time>{new Date(post.date).toDateString()}</time>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </article>
          );
        })}
      <hr />
      {hasMore && !loading && (
        <button onClick={() => setPage((p) => p + 1)}>Load more</button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}
