import React from "react";
import Navbar from "../components/ArticleDetailsPage/detailArticleNavbar";
import HeaderArticle from "../components/ArticleDetailsPage/headerArticle";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * DetailArticle component represents the page displaying detailed information about an article.
 * @returns {JSX.Element} JSX element for the DetailArticle component.
 */
const DetailArticle = () => {
  // Retrieve the stored article from local storage
  const storedArticle = localStorage.getItem('selectedArticle');
  console.log("Stored article ",storedArticle);

  // Parse the stored article or use an empty object if not present
  const article = storedArticle ? JSON.parse(storedArticle) : {};
  console.log('Article stored in local storage:', article);

  // Initialize variables for the first and second halves of the integral text
  let firstHalfIntegralText = '';
  let secondHalfIntegralText = '';
  
  // Split the integral text into two halves around the midpoint
  if (article && article.integralText) {
    const midpoint = Math.floor(article.integralText.length / 2);
    const nearestWhitespace = article.integralText.lastIndexOf(' ', midpoint) + 1;
    firstHalfIntegralText = article.integralText.slice(0, nearestWhitespace);
    secondHalfIntegralText = article.integralText.slice(nearestWhitespace);
  }
  
  // Use 'N/A' if references are not available
  const formattedReferences = article.references || 'N/A';


  /**
   * generatePDF function generates a PDF document containing information about the article.
   */
  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // const lignes_title=article.title.length % 77;
    // const Y=20
    // for (let i = 1; i <= lignes_title; i++) {
    //   for (let j = 0; j < article.title.length; i += 77) {
    //     const chunk = article.title.substring(i, i + 77);
    //     pdf.text('Title : '+chunk, 10, Y*i);
    //     // Faites quelque chose avec la tranche, comme l'écrire dans votre PDF
    //   }
    // }

    // Add title
      pdf.setFont('times', 'bold');
      pdf.text('Title : '+article.title, 10, 20);
      pdf.setFont('times', 'normal');
  
    //  Add Authors, Institutions, PublishDate, and Keywords
   
      pdf.text('Authors :'+ article.authors, 20, 30);
      pdf.text('Institutions :'+ article.institutions, 20, 40);
      pdf.text('Publish Date :'+ article.publishDate, 20, 50);
      pdf.text('Keywords : ' +article.keywords, 20, 60);
    
  
    //  Add Abstract
    pdf.setFont('times', 'bold');
    pdf.text('Abstract:', 20, 70);
    pdf.setFont('times', 'normal');
  
    const abstractLines = pdf.splitTextToSize(article.abstract, pdf.internal.pageSize.width - 40);
    pdf.text(abstractLines, 20, 80);
  
    //  Add Integral Text
    pdf.setFont('times', 'bold');
    pdf.text('Integral Text:', 20, 100);
    pdf.setFont('times', 'normal');
    pdf.autoTable({ startY: 110, body: [[firstHalfIntegralText, secondHalfIntegralText]] });
  
    //  Add References
    pdf.text(`References: ${formattedReferences}`, 20, pdf.autoTable.previous.finalY + 20);
  
    // Save the PDF
    pdf.save('article.pdf');
  };
  
  
  
  
  // JSX structure for the DetailArticle component
  return (
    <div className="flex flex-col overflow-x-hidden max-sm:-ml-8">
       {/* Navbar component with the title */}
      <Navbar title={article.title}/>

      {/* HeaderArticle component with additional information */}
      <HeaderArticle Authors={article.authors} Institutions={article.institutions} PublishDate={article.publishDate} KeyWords={article.keywords} />
      
      {/* Abstract section */}
      <div className="mt-10 w-5/6">
        <p className=" ml-24 font-bold text-lg">Abstract :</p>
        <p className="ml-24 mt-2">{article.abstract}</p>
      </div>

       {/* Integral Text section */}
      <div className="mt-10 w-5/6">
      <p className="ml-24 font-bold text-lg">Integral Text :</p>
      </div>
      
      {/* Grid layout for displaying the two halves of the Integral Text */}
      <div className="mr-24 ml-24 grid grid-cols-2">
        <p className="mt-2 mr-3">{firstHalfIntegralText}</p>
        <p className="mt-2 ml-3">{secondHalfIntegralText}</p>
      </div>

      {/* User icon */}
      <div className="flex items-center max-sm:mr-10">
          <div className=" ml-auto -mr-40 -mt-36  w-56 h-56 rounded-full bg-darkBlue"></div>
          </div>

      {/* References section */}    
      <p className="ml-24 mt-10"><strong className="text-lg ">References :</strong> {formattedReferences}</p>
      
      {/* Button to generate and view the PDF */}
      <button className="ml-auto  mr-24 max-sm:mr-14 bg-pink  rounded-full  my-10  py-2 px-10 hover:bg-pink-700" onClick={generatePDF}>
         <p className="text-white">View PDF</p>   
      </button>
    </div>
  );
}

expo