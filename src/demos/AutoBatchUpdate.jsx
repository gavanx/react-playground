import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { flushSync } from "react-dom";

export default () => {
  const [count, setCount] = useState(0);
  const updateCount = useCallback(() => {
    setTimeout(() => {
      flushSync(() => {
        setCount((c) => c + 1);
      });
      setCount((c) => c + 1);
    });
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setCount((c) => c + 1);
      setCount((c) => c + 1);
    });
  }, []);
  console.log("Demo AutoBatchUpdate render ", count);
  return (
    <div>
      AutoBatchUpdate: {count}
      <button onClick={updateCount}>+</button>
    </div>
  );
};
