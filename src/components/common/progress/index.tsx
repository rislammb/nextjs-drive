import React from "react";

export default function Progress({ value }: { value: number }) {
  return (
    <progress
      className="progress progress-accent w-3/4"
      value={value}
      max={"100"}
    />
  );
}
