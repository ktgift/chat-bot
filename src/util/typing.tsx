import React, { useEffect, useState } from "react";

function getNextVisibleHtml(html: string, cursor: number) {
  // ถ้า cursor อยู่ที่ tag ให้ข้าม tag ทั้งหมด
  if (html[cursor] === "<") {
    let next = cursor + 1;
    while (next < html.length && html[next] !== ">") next++;
    return html.slice(0, next + 1);
  }
  // ถ้าไม่ใช่ tag ให้ return ทีละตัว
  return html.slice(0, cursor + 1);
}

function useTypedHtml(html: string, speed: number = 40) {
  const [displayedHtml, setDisplayedHtml] = useState("");
  useEffect(() => {
    setDisplayedHtml("");
    if (!html) return;

    let i = 0;
    let timeout: number;

    function typeChar() {
      // ถ้าเป็น tag html ให้ข้ามไปจนจบ tag
      if (html[i] === "<") {
        let tagEnd = i + 1;
        while (tagEnd < html.length && html[tagEnd] !== ">") tagEnd++;
        // ตัด html ให้ถึงจบ tag
        setDisplayedHtml(html.slice(0, tagEnd + 1));
        i = tagEnd + 1;
        timeout = window.setTimeout(typeChar, 0); // tag = ไม่ต้อง delay
      } else {
        setDisplayedHtml(html.slice(0, i + 1));
        i++;
        timeout = window.setTimeout(typeChar, speed);
      }
      if (i >= html.length) return;
    }
    typeChar();
    return () => clearTimeout(timeout);
  }, [html, speed]);
  return displayedHtml;
}

export function TypedHtml({
  html,
  speed = 40,
  sx,
  ...props
}: {
  html: string;
  speed?: number;
  sx?: React.CSSProperties;
  [key: string]: any;
}) {
  const displayedHtml = useTypedHtml(html, speed);
  return (
    <div
      style={sx}
      dangerouslySetInnerHTML={{ __html: displayedHtml }}
      {...props}
    />
  );
}
