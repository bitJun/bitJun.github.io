import React, { FC } from "react";

interface FooProps {
  children: any;
}
const Foo: FC<FooProps> = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Foo;
