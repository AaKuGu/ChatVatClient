import React, { useState } from "react";

const Test = () => {
  const [name, setName] = useState("Aadarsh");
  return <div>{name && <div>Hii</div>}</div>;
};

export default Test;
