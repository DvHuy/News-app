import DataTable from "react-data-table-component";
import { columns } from "../utils/PostsHelper";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [timeQuery, setTimeQuery] = useState("");

  //Lọc dữ liệu
  const filterPosts = (e) => {
    const startTime = Date.now(); 
    const records = posts.filter((pos) =>
      pos.Title.toLowerCase().replace(/\s+/g, ' ').includes(e.target.value.trim().replace(/\s+/g, ' ').toLowerCase())
    );
    const endTime = Date.now();
    const filterTime = endTime - startTime;
    setFilteredPosts(records);
    setTimeQuery(filterTime);
  };

  // Fetch data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/news", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);

        if (response.data.success) {
          const data = await response.data.posts.map((post) => ({
            Title: post.Title,
            Summary: post.Summary,
            Content: post.Content,
          }));
          setPosts(data);
          setFilteredPosts(data);
          setTimeQuery(response.data.queryTime);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="p-5 bg-teal-300">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Posts</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By Title"
          className="px-4 py-0.5 rounded border"
          onChange={filterPosts}
        />
        <div className="px-4 font-bold">Thời gian trả về: {timeQuery} ms</div>
      </div>
      <div className="mt-5">
        <DataTable columns={columns} data={filteredPosts} pagination />
      </div>
    </div>
  );
};

export default Home;
