
function RenderWithCondition({ condition, children }) {
    return ( 
       condition && children
     );
}

export default RenderWithCondition;