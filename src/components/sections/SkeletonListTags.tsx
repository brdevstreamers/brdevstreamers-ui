import { Skeleton } from "@chakra-ui/react";

const skeletons = [
  { id: 1, width: "80px" },
  { id: 2, width: "175px" },
  { id: 3, width: "204px" },
  { id: 4, width: "184px" },
  { id: 5, width: "285px" },
  { id: 6, width: "212px" },
  { id: 7, width: "47px" },
  { id: 8, width: "150px" },
  { id: 9, width: "144px" },
  { id: 10, width: "104px" },
  { id: 11, width: "99px" },
];

export const SkeletonListTags = () => {
  return (
    <>
      {skeletons.map((skeleton) => (
        <Skeleton
          key={skeleton.id}
          width={skeleton.width}
          height="24px"
          flexShrink={0}
          m={1}
          rounded="sm"
        />
      ))}
    </>
  );
};
