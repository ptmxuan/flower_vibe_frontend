import React from "react";
import { List } from "antd";
import flowerStoryData from "@/constants/FlowerStoryData";
import "@/styles/FlowerStory.scss";
function FlowerStory() {
  return (
    <div className="flower-story">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={flowerStoryData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            extra={
              <img
                width={270}
                height={202.5}
                alt={item.title}
                src={item.imageUrl}
              />
            }
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}

export default FlowerStory;
