import { useContext, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { AppContext } from "./context/AppContext";
import BlobCursor from "./cursor/BlobCursor";
import Aurora from "./background/Aurora"; // Import Aurora

function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <>
      {/* Aurora Background - Place first so it renders behind everything */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Aurora
          colorStops={["#00ff88", "#00aaff", "#aa00ff"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      {/* Your main content */}
      <div className="App relative">
        <Navbar/>
        <Blogs />
        <Pagination />
      </div>
      
      {/* Blob Cursor */}
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={9999}
      />
    </>
  );
}

export default App;
