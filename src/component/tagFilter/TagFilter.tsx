import { Tag, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { TagModel } from "../../model/TagModel";

interface Props {
  filterByTags(tags: string[]): void;
}

export default function TagFilter(props: Props) {
  const [tags, setTags] = React.useState<TagModel[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + "tags").then((response) => {
      setTags(response.data);
    });
  }, []);

  React.useEffect(() => {
    
    props.filterByTags(selectedTags);
   
  }, [selectedTags]);

  const handleTagClick = (tag: TagModel) => {
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  return (
    <>
      <Wrap mb="4" spacing={4}>
        {tags.map((tag: TagModel) => {
          return (
            <WrapItem key={tag.id}>
              <Tag
                size="md"
                onClick={() => handleTagClick(tag)}
                cursor="pointer"
                borderRadius="full"
                variant="solid"
                backgroundColor={
                  selectedTags.includes(tag.id) ? "#1F2A3D" : "#717278"
                }
              >
                {tag.name}
              </Tag>
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
}
