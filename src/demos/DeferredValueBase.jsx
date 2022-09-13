import { useState, useLayoutEffect } from "react";

export default function () {
  const [value, setValue] = useState("");
  useLayoutEffect(() => {
    // 浏览器渲染前移除大量的 dom 节点，排除浏览器渲染大量节点的影响
    const container = document.getElementsByClassName("container");
    const list = document.getElementsByClassName("list");
    if (list.length) {
      container[0].removeChild(list[0]);
    }
  });

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="container">
      <input value={value} onChange={handleChange} />
      <div className="list">
        {Array(10000000)
          .fill("test")
          .map((item) => (
            <div>{value}</div>
          ))}
      </div>
    </div>
  );
}
