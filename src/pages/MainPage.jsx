import { useEffect, useState } from "react";
import "../style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "../store/actions/translateActions";
import Select from "react-select";
import { clearAnswer } from "../store/slices/transleteSlice";
import { LuArrowLeftRight } from "react-icons/lu";

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.translateSlice);
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //   changes the values of the states
  const handleChange = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    // clear the text areas
    setText("");
    dispatch(clearAnswer());
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Translate</h1>

        {/* top part */}
        <div className="upper">
          <Select
            className="react-select"
            isDisabled={state.isLoading}
            options={state.languages}
            onChange={setSourceLang}
            value={sourceLang}
            isLoading={state.isLoading}
          />
          <button className="change-button" onClick={handleChange}>
            <LuArrowLeftRight />
          </button>
          <Select
            className="react-select"
            options={state.languages}
            onChange={setTargetLang}
            value={targetLang}
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
          />
        </div>
        {/* bottom part */}
        <div className="bottom">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <textarea value={state.answer} disabled></textarea>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          id="translate"
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default MainPage;
