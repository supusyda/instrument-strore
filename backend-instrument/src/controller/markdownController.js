import express from "express";
import Markdown from "../service/markdownService";

let createMarkdown = async (req, res) => {
  try {
    let data = await Markdown.createMarkdownService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from sever ...",
    });
  }
};

module.exports = {
  createMarkdown: createMarkdown
};
