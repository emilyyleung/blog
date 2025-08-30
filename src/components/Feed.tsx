import {useState} from "react"

export interface Post {
    slug: string
    project :string
    title: string
    date: Date
    body: string
}

interface FeedProps {
    initialPosts: Post[]
    allPosts: Post[]
}

export default function Feed({initialPosts, allPosts}: FeedProps) {
    const [posts, setPosts] = useState(initialPosts)
    const [count, setCount] = useState(initialPosts.length)

    const loadMore = () => {
        const next = allPosts.slice(count, count + 10)
        setPosts([...posts, ...next])
        setCount(count + next.length)
    }

    return (
        <div className="prose">
            {posts.map((post) => (
                <article key={post.slug} className="feed-item">
                    <h3>{post.title}</h3>
                    <div>{post.data.date.toDateString()}</div>
                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                    <p>
                        <a href={`/projects/${post.slug}`}>View post</a>
                    </p>
                </article>
            ))}
            {
                count < allPosts.length && (
                    <button onClick={loadMore}>Load more</button>
                )
            }
        </div>
    )
}