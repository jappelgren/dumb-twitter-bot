import google from "googlethis";
import fs from "fs";
import axios from "axios";
import { nouns, adjectives, countries } from "../variables/searchTerms.js";

const randomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const searchTerm = () => {
  const countryDecider = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  const randomAdjective = randomItem(adjectives);
  const randomNoun = randomItem(nouns);
  const randomCountryOrSpace =
    countryDecider === 10 ? ` ${randomItem(countries)} ` : " ";
  const searchTerm = `${randomAdjective}${randomCountryOrSpace}${randomNoun}`;

  console.log(`Searching for an image of ${searchTerm}`);

  return searchTerm;
};

const saveImage = async (result, urlToQuery, fileExtension) => {
  const file = fs.createWriteStream(
    `./images/${Math.floor(Math.random() * 100000000)}${fileExtension}`
  );
  try {
    if (fileExtension !== "undefined") {
      const response = await axios.get(result[urlToQuery].url, {
        responseType: "stream",
      });
      await response.data.pipe(file);
    }
  } catch (error) {
    console.log(error.response);
  }
};

export const search = async () => {
  let result = await google.image(searchTerm(), { safe: false });
  let urlToQuery;
  let fileExtension;
  let count = 0;

  while (fileExtension === undefined) {
    urlToQuery = Math.floor(Math.random() * result.length);
    fileExtension = await result[urlToQuery]?.url.slice(-4);
    count++;

    if (count === 10) {
      result = await google.image(searchTerm(), { safe: false });
      count = 0;
    }
  }

  if (
    fileExtension?.charAt(0) === "." ||
    fileExtension?.toLowerCase() === "webp"
  ) {
    if (
      fileExtension?.toLowerCase() === ".gif" ||
      fileExtension?.toLowerCase() === ".png" ||
      fileExtension?.toLowerCase() === ".jpg" ||
      fileExtension?.toLowerCase() === ".jpeg"
    ) {
      await saveImage(result, urlToQuery, fileExtension);
      return;
    } else if (fileExtension?.toLowerCase() === "webp") {
      fileExtension = ".jpg";
      await saveImage(result, urlToQuery, fileExtension);
      return;
    }
    console.log("Skipping");
  }
};
