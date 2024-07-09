import { useCallback, useContext, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { AppState } from "../../Components/DataProvider/DataProvider";
import styles from "./home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Layout from "../../Components/Layout/Layout";
import QuestionCard from '../../Components/QuestionCard/QuestionCard'

export default function Home() {
  const navigate = useNavigate();
  const {
    user: { username },
  } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  const [isFetchingFavorite, setIsFetchingFavorite] = useState(false);

  const fetchQuestions = useCallback(async () => {
    try {
      const { data } = await axios.get("/questions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log(data);

      //   const updatedQuestions = await Promise.all(
      //     data.map(async (question) => {
      //       const username = await getUsername(question.userid);
      //       return { ...question, username };
      //     })
      //   );

      setQuestions(data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // const getUsername = async (userId) => {
  //   const res = await axios.get(`/users/${userId}`);
  //   return res.data[0].username;
  // };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (e.target.value.trim() === "") {
      fetchQuestions();
      return;
    }

    try {
      const { data } = await axios.get(`/questions/search/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const searchTerm = e.target.value;

      data.forEach((question) => {
        const edited = question.title
          .split(searchTerm.trim())
          .join(`<span style="color: orange !important;">${searchTerm}</span>`);
        question.title = edited;
      });

      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavoritesClick = async () => {
    if (!isFetchingFavorite) {
      try {
        const { data } = await axios.get("/questions/favorite", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log(data);
        setQuestions(data);

        setIsFetchingFavorite(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchQuestions();
      setIsFetchingFavorite(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.welcomeWrapper}>
          <div className={styles.button}>
            <Link to="/ask">Ask Question</Link>
          </div>
          <span className={styles.username}>Welcome {username}</span>
        </div>

        <div>
          <div className={styles.searchWrapper}>
            <p>Questions</p>
            <form onSubmit={handleSearch}>
              <div
                className={styles.favorites}
                style={{ background: isFetchingFavorite && "orange" }}
                onClick={handleFavoritesClick}
              >
                <FaRegHeart />
                Favorites
              </div>
              <input
                type="text"
                placeholder="Search Questions"
                className={styles.search}
                onChange={(e) => handleSearch(e)}
              />
              <button type="submit" className={styles.button}>
                <IoSearch />
              </button>
            </form>
          </div>
          <div className={styles.questionsWrapper}>
            {questions?.length == 0 && (
              <div className={styles.empty}>
                <img src="/empty.png" alt="empty" />
                <p>No question</p>
              </div>
            )}
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                isLast={index == questions.length - 1}
                setQuestions={setQuestions}
                isFetchingFavorite={isFetchingFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}