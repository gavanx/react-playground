import {
  useState,
  useEffect,
  useLayoutEffect,
  useDeferredValue,
  memo,
  useTransition,
} from "react";

export default function () {
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  // const deferredValue = useDeferredValue(value);
  const handleChange = (e) => setValue(e.target.value);
  const [deferredValue, setDeferredValue] = useState("");

  useEffect(() => {
    startTransition(() => setDeferredValue(value));
  }, [value, startTransition]);
  return (
    <div>
      <input value={value} onChange={handleChange} />
      <LongList value={deferredValue} />
    </div>
  );
}

const LongList = memo((props) => {
  useLayoutEffect(() => {
    // 浏览器渲染前移除大量的 dom 节点，排除浏览器渲染大量节点的影响
    const container = document.getElementsByClassName("container");
    const list = document.getElementsByClassName("list");
    if (list.length) {
      container[0].removeChild(list[0]);
    }
  });
  return (
    <div className="container">
      {Array(100000000)
        .fill("test")
        .map((item) => (
          <div>{props.value}</div>
        ))}
    </div>
  );
});
