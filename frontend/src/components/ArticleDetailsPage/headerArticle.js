import React from "react";

const HeaderArticle = ({ Authors, Institutions, PublishDate, KeyWords }) => {
  // Check if arrays are defined before calling join
  const formattedAuthors = Array.isArray(Authors) ? Authors.join(' , ') : Authors;
  const formattedInstitutions = Array.isArray(Institutions) ? Institutions.join(' , ') : Institutions;
  const formattedKeywords = Array.isArray(KeyWords) ? KeyWords.join(' , ') : KeyWords;

  return (
    <div className="ml-16 mt-6 p-4 mb-4 relative">
      <div className="absolute rounded-lg left-2 top-7 bottom-7 w-2 bg-lightBlue"></div>

      <div className="ml-3">
        <div className="mb-2">
          <p><strong className="text-lg">Authors : </strong> {formattedAuthors}</p>
        </div>
        <div className="mb-2">
          <p><strong className="text-lg">Institutions : </strong> {formattedInstitutions}</p>
        </div>
        <div className="mb-2">
          <p><strong className="text-lg">Publication Date : </strong> {PublishDate}</p>
        </div>
        <div>
          <p><strong className="text-lg">KeyWords : </strong> {formattedKeywords}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderArticle;
