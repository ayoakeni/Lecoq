import React, { useEffect, useState, useCallback } from "react";
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db, storage } from "../utils/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import SafeHtml from "../components/safeHtml";
import { Helmet } from "react-helmet";
import DateTimeDisplay from "../components/timeFormat";
import displayImage from "../assets/images/mad-designer.png";
import debounce from "lodash.debounce";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreBlogs, setHasMoreBlogs] = useState(true);

  const fetchBlogs = useCallback(
    async (loadMore = false) => {
      if ((loadMore && !hasMoreBlogs) || isFetchingMore) return;

      try {
        if (loadMore) setIsFetchingMore(true);

        const blogsQuery = loadMore
          ? query(
              collection(db, "blogs"),
              orderBy("time", "desc"),
              startAfter(lastVisible),
              limit(5)
            )
          : query(collection(db, "blogs"), orderBy("time", "desc"), limit(6));

        const querySnapshot = await getDocs(blogsQuery);

        if (querySnapshot.empty) {
          setHasMoreBlogs(false);
          return;
        }

        const fetchedBlogs = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const blogData = doc.data();
            const imageUrl = blogData.image ? await getImageURL(blogData.image) : null;
            return {
              id: doc.id,
              ...blogData,
              image: imageUrl,
            };
          })
        );

        setBlogs((prevBlogs) => [
          ...prevBlogs,
          ...fetchedBlogs.filter((blog) => !prevBlogs.some((b) => b.id === blog.id)),
        ]);

        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
        setIsFetchingMore(false);
      }
    },
    [lastVisible, isFetchingMore, hasMoreBlogs]
  );

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        fetchBlogs(true);
      }
    }, 300),
    [fetchBlogs]
  );

  useEffect(() => {
    fetchBlogs();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchBlogs, handleScroll]);

  const getImageURL = async (imagePath) => {
    try {
      const imageRef = ref(storage, imagePath);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  if (loading) {
    return (
      <div className="loaderBox">
        <span className="loader"></span>
      </div>
    );
  }

  if (!blogs.length) {
    return <div className="noDetailBlog">No blogs found.</div>;
  }

  return (
    <div className="blog">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Blogs</title>
        <meta name="description" content="Explore our latest blog posts on a variety of topics, from educational updates to school news and more." />
        <meta name="keywords" content="blogs, Lecoq French School, education, news, updates, articles" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://lecoqfrench.com/blogs" />

        {/* Open Graph (OG) Meta Tags for Facebook */}
        <meta property="og:title" content="Blogs" />
        <meta property="og:description" content="Explore our latest blog posts on a variety of topics, from educational updates to school news and more." />
        <meta property="og:image" content={displayImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lecoqfrench.com/blogs" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blogs" />
        <meta name="twitter:description" content="Explore our latest blog posts on a variety of topics, from educational updates to school news and more." />
        <meta name="twitter:image" content={displayImage} />
      </Helmet>
      <h2 className="title edu">Blogs</h2>
      <section className="blog-grid">
        {blogs.map((blog) => (
          <div className="blogPost" key={blog.id}>
            {blog.imageUrl ? (
              <img src={blog.imageUrl} alt={blog.title} className="blogImage" />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
            <div className="blogDetails">
              <div className="blogMeta">
                <li className="nameDate">
                  <span>{blog.author}</span>
                  <i className="fa-solid fa-asterisk"></i>
                  <DateTimeDisplay timestamp={blog.time} showTime={false} />
                </li>
              </div>
              <strong className="blogTitle">{blog.title}</strong>
              <p className="blogExcerpt">
                <SafeHtml htmlContent={blog.excerpt} fallback="No excerpt provided." />
              </p>
              <button
                className="readButton"
                onClick={() => window.open(`/blog/${blog.id}`, "_blank")}
              >
                Read post
              </button>
            </div>
          </div>
        ))}
      </section>
      {isFetchingMore && (
        <div className="lazyLoad">
          Loading more blogs...
        </div>
      )}
      {!hasMoreBlogs && <div className="endOfBlogs">You have reached the end line.</div>}
    </div>
  );
};

export default Blog;
