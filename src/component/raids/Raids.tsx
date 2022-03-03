import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import {
  Canvas,
  Node,
  EdgeData,
  NodeData,
  createEdgeFromNodes,
  hasLink,
} from "reaflow";


export default function Raids() {
    const [nodes, setNodes] = useState<NodeData[]>([
        {
          id: "1",
          text: "marcobruno",
        },
        {
          id: "2",
          text: "flaviojmendes",
        },
        {
          id: "3",
          text: "nandosangenetto",
        },
        {
          id: "4",
          text: "flaviojmendes",
        },
        {
          id: "5",
          text: "sofiarochinha",
        },
        {
          id: "6",
          text: "pvr1z",
        }
      ]);
      
      const [edges, setEdges] = useState<EdgeData[]>([
        {
          id: "1-2",
          from: "1",
          to: "2",
        },
        {
          id: "2-3",
          from: "2",
          to: "3",
        },
        {
          id: "3-4",
          from: "3",
          to: "4",
        },
        {
          id: "5-4",
          from: "5",
          to: "4",
        },
        {
          id: "6-5",
          from: "6",
          to: "5",
        },
        
      ]);
      
  return (
    <>
      <Heading as="h3" size="sm" mb="20px">
        Minhas Raids
      </Heading>

      <div>
        <Canvas
          nodes={nodes}
          edges={edges}
          maxWidth={1000}
          maxHeight={700}
          node={<Node dragType="node" />}
          onNodeLinkCheck={(_event, from: NodeData, to: NodeData) => {
            if (from.id === to.id) {
              return false;
            }

            if (hasLink(edges, from, to)) {
              return false;
            }

            return true;
          }}
          onNodeLink={(_event, from, to) => {
            const newEdges = edges.filter((e) => e.to !== from.id);

            setEdges([...newEdges, createEdgeFromNodes(to, from)]);
          }}
        />
      </div>
    </>
  );
}
