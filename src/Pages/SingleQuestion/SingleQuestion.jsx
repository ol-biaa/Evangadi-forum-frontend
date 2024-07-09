import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./singleQuestion.module.css";
import { useContext, useEffect, useState } from "react";
//import AnswerCard from "../../../../../Elearning-fullstack/AnswerCard/AnswerCard";
import { AppState } from "../../Components/DataProvider/DataProvider";
import { applyStyleForCodes } from "../../util/applyStyleForCodes";
import Layout from "../../Components/Layout/Layout";
import AnswerCard from '../../Components/AnswerCard/AnswerCard'

export default function SingleQuestion() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const { qnid } = useParams();
  const { user } = useContext(AppState);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const { data } = await axios.get(`/questions/${qnid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestion(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuestion();
  }, [qnid]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const { data } = await axios.get(`/answers/${qnid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // const updatedAnswers = await Promise.all(
        //   data.map(async (question) => {
        //     const username = await getUsername(question.userid);
        //     return { ...question, username };
        //   })
        // );

        // setAnswers(updatedAnswers.reverse());
        setAnswers(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAnswers();
  }, [qnid]);

  const getUsername = async (userId) => {
    const res = await axios.get(`/users/${userId}`);
    return res.data[0].username;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (answer.trim() === "") {
      setError("answer cannot be empty");
      return;
    }

    const modifiedAnswer = applyStyleForCodes(answer);

    try {
      const { status, data } = await axios.post(
        `/answers/${qnid}`,
        {
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (status !== 201) {
        setError(data.message);
        return;
      }

      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { answer: modifiedAnswer, username: user.username },
      ]);

      setAnswer("");
    } catch (error) {
      //setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.question}>
          <h2>Question</h2>
          <div></div>
          <h3>{question?.title}</h3>
          <p>{question?.description}</p>
        </div>

        <div className={styles.answers}>
          <h2>Answer From the Community</h2>
          {answers.length === 0 && (
            <div className={styles.empty}>
              <img src="/empty.png" alt="empty" />
              <p>be the first to answer</p>
            </div>
          )}
          <div>
            {answers.map((answer, index) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                isLast={index == answers.length - 1}
              />
            ))}
          </div>
        </div>

        <div className={styles.answerQuestion}>
          <h2>Answer The Top Question</h2>
          <p>
            <Link to="/">Go to Question page</Link>
          </p>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Your Answer..."
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <button type="submit">Post Your Answer</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}