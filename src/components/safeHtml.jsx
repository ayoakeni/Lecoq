import React from "react";
import DOMPurify from "dompurify";

const SafeHtml = ({ htmlContent, fallback = "Content is not available." }) => {
  if (!htmlContent) {
    return <p>{fallback}</p>;
  }

  const sanitizedContent = DOMPurify.sanitize(htmlContent);
  return <div className="safeHtml" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default SafeHtml;
