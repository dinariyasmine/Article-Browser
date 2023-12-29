import React from "react";
import Navbar from "../components/SearchScreen/detailArticleNavbar";
import HeaderArticle from "../components/SearchScreen/headerArticle";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const generatePDF = () => {
  const pdf = new jsPDF();

  // Add title
  pdf.setFont('times', 'bold');
  pdf.text(closedArticles.title, 20, 20);
  pdf.setFont('times', 'normal');
  

  // Add Authors, Institutions, PublishDate, and Keywords
  pdf.text(`Authors: ${closedArticles.Authors.join(', ')}`, 20, 30);
  pdf.text(`Institutions: ${closedArticles.Institutions.join(', ')}`, 20, 40);
  pdf.text(`Publish Date: ${closedArticles.PublishDate}`, 20, 50);
  pdf.text(`Keywords: ${closedArticles.keywords.join(', ')}`, 20, 60);

  // Add Abstract
  pdf.setFont('times', 'bold');
  pdf.text('Abstract:', 20, 70);
  pdf.setFont('times', 'normal');
  
  const abstractLines = pdf.splitTextToSize(closedArticles.Abstract, pdf.internal.pageSize.width - 40);
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


const closedArticles = {
  title: 'The article’s title',
  Institutions: ['Institution1', 'Institution2', 'Institution3'],
  keywords: ['React', 'JavaScript'],
  PublishDate: '2023-01-01',
  Authors: ['Marc Levy', 'Harvey Specter'],
  Abstract: 'This is the abstract of the article. It provides a brief overview about the content of the article and what you can expect to learn',
  IntegralText: 'Sint occaecat voluptate Lorem laborum sit eu incididunt deserunt ut ut aliquip sint non. Deserunt quis in exercitation tempor labore cillum proident irure cillum nostrud nostrud amet sit dolor. Incididunt eiusmod Lorem occaecat adipisicing dolor sint. Exercitation et mollit aliquip tempor ipsum in id deserunt magna dolor qui. Ea incididunt reprehenderit pariatur ut tempor sint occaecat aliquip.',
  References: ['Reference 1','Reference 2','Reference 3']
}

// Calculate the midpoint of the IntegralText
const midpoint = Math.floor(closedArticles.IntegralText.length / 2);

// Find the nearest whitespace to the midpoint
const nearestWhitespace = closedArticles.IntegralText.lastIndexOf(' ', midpoint) + 1;

// Create a constant with the first half of IntegralText
const firstHalfIntegralText = closedArticles.IntegralText.slice(0, nearestWhitespace);

// Create a constant with the second half of IntegralText
const secondHalfIntegralText = closedArticles.IntegralText.slice(nearestWhitespace);

const formattedReferences = closedArticles.References.join(' , ');

const DetailArticle = () => {
 
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar title={closedArticles.title} />
      <HeaderArticle Authors={closedArticles.Authors} Institutions={closedArticles.Institutions} PublishDate={closedArticles.PublishDate} KeyWords={closedArticles.keywords} />
      <div className="mt-10 w-5/6">
        <p className=" ml-24 font-bold text-lg">Abstract :</p>
        <p className="ml-24 mt-2">{closedArticles.Abstract}</p>
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
