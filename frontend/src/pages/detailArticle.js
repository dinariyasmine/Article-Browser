import React from "react";
import Navbar from "../components/ArticleDetailsPage/detailArticleNavbar";
import HeaderArticle from "../components/ArticleDetailsPage/headerArticle";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const DetailArticle = () => {
  
  const storedArticle = localStorage.getItem('selectedArticle');
  console.log("ANA ani hna",storedArticle);
  const article = storedArticle ? JSON.parse(storedArticle) : {};
  console.log('Article stored in local storage:', article);
  let firstHalfIntegralText = '';
  let secondHalfIntegralText = '';
  
  if (article && article.integralText) {
    const midpoint = Math.floor(article.integralText.length / 2);
    const nearestWhitespace = article.integralText.lastIndexOf(' ', midpoint) + 1;
    firstHalfIntegralText = article.integralText.slice(0, nearestWhitespace);
    secondHalfIntegralText = article.integralText.slice(nearestWhitespace);
  }
  
  const formattedReferences = Array.isArray(article.references) ? article.references.join(', ') : 'N/A';


  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // Add title
    pdf.setFont('times', 'bold');
    pdf.text(article.title, 20, 20);
    pdf.setFont('times', 'normal');
  
    // Add Authors, Institutions, PublishDate, and Keywords
    if (Array.isArray(article.authors)) {
      pdf.text(`Authors: ${article.authors.join(', ')}`, 20, 30);
    } else {
      pdf.text('Authors: N/A', 20, 30);
    }
  
    if (Array.isArray(article.Institutions)) {
      pdf.text(`Institutions: ${article.Institutions.join(', ')}`, 20, 40);
    } else {
      pdf.text('Institutions: N/A', 20, 40);
    }
  
    pdf.text(`Publish Date: ${article.publishDate}`, 20, 50);
  
    if (Array.isArray(article.keywords)) {
      pdf.text(`keywords: ${article.keywords.join(', ')}`, 20, 60);
    } else {
      pdf.text('keywords: N/A', 20, 60);
    }
  
    // Add Abstract
    pdf.setFont('times', 'bold');
    pdf.text('Abstract:', 20, 70);
    pdf.setFont('times', 'normal');
  
    const abstractLines = pdf.splitTextToSize(article.abstract, pdf.internal.pageSize.width - 40);
    pdf.text(abstractLines, 20, 80);
  
    // Add Integral Text
    pdf.setFont('times', 'bold');
    pdf.text('Integral Text:', 20, 100);
    pdf.setFont('times', 'normal');
    pdf.autoTable({ startY: 110, body: [[firstHalfIntegralText, secondHalfIntegralText]] });
  
    // Add References
    pdf.text(`References: ${formattedReferences}`, 20, pdf.autoTable.previous.finalY + 20);
  
    // Save the PDF
    pdf.save('article.pdf');
  };
  
  
  return (
    <div className="flex flex-col overflow-x-hidden max-sm:-ml-8">
      <Navbar title={article.title}/>
      <HeaderArticle Authors={article.authors} Institutions={article.institutions} PublishDate={article.publishDate} KeyWords={article.keywords} />
      <div className="mt-10 w-5/6">
        <p className=" ml-24 font-bold text-lg">Abstract :</p>
        <p className="ml-24 mt-2">{article.abstract}</p>
      </div>
      <div className="mt-10 w-5/6">
      <p className="ml-24 font-bold text-lg">Integral Text :</p>
      </div>
      
      <div className="mr-24 ml-24 grid grid-cols-2">
        <p className="mt-2 mr-3">{firstHalfIntegralText}</p>
        <p className="mt-2 ml-3">{secondHalfIntegralText}</p>
      </div>
      <div className="flex items-center">
          <div className=" ml-auto -mr-40 -mt-36  w-56 h-56 rounded-full bg-darkBlue"></div>
          </div>
      <p className="ml-24 mt-10"><strong className="text-lg ">References :</strong> {formattedReferences}</p>
      <button className="ml-auto  mr-24 max-sm:mr-14 bg-pink  rounded-full  my-10  py-2 px-10 hover:bg-pink-700" onClick={generatePDF}>
         <p className="text-white">View PDF</p>   
      </button>
    </div>
  );
}

export default DetailArticle;
