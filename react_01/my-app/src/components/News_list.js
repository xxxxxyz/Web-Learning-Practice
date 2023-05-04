import React from "react";
import NewsListItem from "./News_list_item";

const NewsList = (props) => {
  const news = props.news.map((item, index) => <NewsListItem item={item} />);
  return <>{news}</>;
};

export default NewsList;
