import { Heading } from "@chakra-ui/react";
import CytoscapeComponent from 'react-cytoscapejs';


const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
 ];


export default function Raids() {
  return (
    <>
      <Heading as="h3" size="sm" mb="20px">
        Minhas Raids
      </Heading>

       <CytoscapeComponent elements={elements} style={ { width: '500px', height: '500px' } } />
      
    </>
  );
}
