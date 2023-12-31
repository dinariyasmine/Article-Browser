import React from "react";
import Navbar from "../components/ArticleDetailsPage/detailArticleNavbar";
import HeaderArticle from "../components/ArticleDetailsPage/headerArticle";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const DetailArticle = () => {
  const User = {
    UserName:'JaneDoe',
    EmailAdress:'jdoe@gmail.com'
  }
  const storedArticle = localStorage.getItem('selectedArticle');
  const article = storedArticle ? JSON.parse(storedArticle) : {};
  console.log('Article stored in local storage:', article);
  let firstHalfIntegralText = '';
  let secondHalfIntegralText = '';
  
  if (article && article.IntegralText) {
    const midpoint = Math.floor(article.IntegralText.length / 2);
    const nearestWhitespace = article.IntegralText.lastIndexOf(' ', midpoint) + 1;
    firstHalfIntegralText = article.IntegralText.slice(0, nearestWhitespace);
    secondHalfIntegralText = article.IntegralText.slice(nearestWhitespace);
    
  }
  const formattedReferences = article && article.References ? article.References.join(', ') : '';


const generatePDF = () => {
  const pdf = new jsPDF();

  // Add title
  pdf.setFont('times', 'bold');
  pdf.text(article.title, 20, 20);
  pdf.setFont('times', 'normal');
  

  // Add Authors, Institutions, PublishDate, and Keywords
  pdf.text(`Authors: ${article.Authors.join(', ')}`, 20, 30);
  pdf.text(`Institutions: ${article.Institutions.join(', ')}`, 20, 40);
  pdf.text(`Publish Date: ${article.PublishDate}`, 20, 50);
  pdf.text(`Keywords: ${article.keywords.join(', ')}`, 20, 60);

  // Add Abstract
  pdf.setFont('times', 'bold');
  pdf.text('Abstract:', 20, 70);
  pdf.setFont('times', 'normal');
  
  const abstractLines = pdf.splitTextToSize(article.Abstract, pdf.internal.pageSize.width - 40);
  pdf.text(abstractLines, 20, 80);

  // Add Integral Text
  pdf.setFont('times', 'bold');
  pdf.text('Integral Text:', 20, 100);
  pdf.setFont('times', 'normal');
  pdf.autoTable({ startY: 110,  body: [[firstHalfIntegralText, secondHalfIntegralText]] });

  // Add References
  pdf.text(`References: ${formattedReferences}`, 20, pdf.autoTable.previous.finalY + 20);

  // Save the PDF
  pdf.save('article.pdf');
};
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar title={article.title} UserName={User.UserName} EmailAdress={User.EmailAdress} />
      <HeaderArticle Authors={article.Authors} Institutions={article.Institutions} PublishDate={article.PublishDate} KeyWords={article.keywords} />
      <div className="mt-10 w-5/6">
        <p className=" ml-24 font-bold text-lg">Abstract :</p>
        <p className="ml-24 mt-2">{article.Abstract}</p>
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
      <button className="ml-auto mr-24 bg-pink  rounded-full  my-10  py-2 px-10 hover:bg-pink-700" onClick={generatePDF}>
         <p className="text-white">View PDF</p>   
      </button>
    </div>
  );
}

export default DetailArticle;
