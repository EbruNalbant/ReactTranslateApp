import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../contants";

export const getLanguages = createAsyncThunk("getLanguages", async () => {
  //  API request
  const res = await axios.request(options);
  //   data to be sent to the store
  const data = res.data.data.languages;

  const refinedData = data.map((item) => ({
    value: item.code,
    label: item.name,
  }));

  return refinedData;
});

// translation process
export const translateText = createAsyncThunk("translate", async (params) => {
  // required settings for api request
  const encodedParams = new URLSearchParams();
  encodedParams.set("source_language", params.sourceLang.value);
  encodedParams.set("target_language", params.targetLang.value);
  encodedParams.set("text", params.text);

  const options = {
    method: "POST",
    url: "https://text-translator2.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "6891b1e5fdmshfa921e7cae49f65p1d4e64jsn5b5b876c6bbd",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    data: encodedParams,
  };
  const res = await axios.request(options);
  // transferring data to store
  return res.data.data.translatedText;
});
