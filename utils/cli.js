import { Command } from "commander";
import { postTweet } from "../server.js";
import { search } from "./imageSearch.js";

const program = new Command();
program
  .option("--post, -p", "Post a Tweet", postTweet)
  .option("--getimage, -gi", "Search for and save a random image", search);
program.parse();

const options = program.opts();
