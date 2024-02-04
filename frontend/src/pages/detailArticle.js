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
    let j,temp_ligne,temp_cara;
    let strd=73;
    let Y=20;
    const X=10;
  
    const lignes_title=Math.floor(article.title.length / strd);
    console.log('lignes_title ', lignes_title);
    pdf.setFont('times', 'bold');
    pdf.text('Title : ', X , Y+=10);
    pdf.setFont('times', 'normal');

    for (let i = 1; i <= lignes_title; i++) {
      console.log('ligne ', i);
      const chunk_title = article.title.substring((i-1)*strd, i*strd);
      console.log('chunk  : ',chunk_title);
      pdf.text(chunk_title, X , Y+=10);
      temp_cara=i*strd;
    }
    if(temp_cara<=article.title.length){
      const chunk_title = article.title.substring(temp_cara, article.title.length-1);
      console.log('chunk 2 : ',chunk_title);
      pdf.text(chunk_title, X , Y+=10);
    }

    const lignes_auteurs=Math.floor(article.authors.length / strd);
    console.log('lignes_auteurs ', lignes_auteurs);
    pdf.setFont('times', 'bold');
    pdf.text('Authors : ', X , Y+=10);
    pdf.setFont('times', 'normal');
    temp_cara=0;

    for (let i = 1; i <= lignes_auteurs; i++) {
      console.log('ligne ', i);
      const chunk_authors = article.authors.substring((i-1)*strd, i*strd);
      console.log('chunk  : ',chunk_authors);
      pdf.text(chunk_authors, X , Y+=10);
      temp_cara=i*strd;
    }
    if(temp_cara<=article.authors.length){
      const chunk_authors = article.authors.substring(temp_cara, article.authors.length-1);
      console.log('chunk 2 : ',chunk_authors);
      pdf.text(chunk_authors, X , Y+=10);
    }

    const lignes_institutions=Math.floor(article.institutions.length / strd);
    console.log('lignes_institutions ', lignes_institutions);
    pdf.setFont('times', 'bold');
    pdf.text('Institutions : ', X , Y+=10);
    pdf.setFont('times', 'normal');
    temp_cara=0;

    for (let i = 1; i <= lignes_institutions; i++) {
      console.log('ligne ', i);
      const chunk_institutions = article.institutions.substring((i-1)*strd, i*strd);
      console.log('chunk  : ',chunk_institutions);
      pdf.text(chunk_institutions, X , Y+=10);
      temp_cara=i*strd;
    }
    if(temp_cara<=article.institutions.length){
      const chunk_institutions = article.institutions.substring(temp_cara, article.institutions.length-1);
      console.log('chunk 2 : ',chunk_institutions);
      pdf.text(chunk_institutions, X , Y+=10);
    }

    const lignes_mots_cles=Math.floor(article.keywords.length / strd);
    console.log('lignes_mots_cles ', lignes_mots_cles);
    pdf.setFont('times', 'bold');
    pdf.text('Keywords : ', X , Y+=10);
    pdf.setFont('times', 'normal');
    temp_cara=0;

    for (let i = 1; i <= lignes_mots_cles; i++) {
      console.log('ligne ', i);
      const chunk_Keywords = article.keywords.substring((i-1)*strd, i*strd);
      console.log('chunk  : ',chunk_Keywords);
      pdf.text(chunk_Keywords, X , Y+=10);
      temp_cara=i*strd;
    }
    if(temp_cara<=article.keywords.length){
      const chunk_Keywords = article.keywords.substring(temp_cara, article.keywords.length-1);
      console.log('chunk 2 : ',chunk_Keywords);
      pdf.text(chunk_Keywords, X , Y+=10);
    }

    pdf.text('Publish Date :'+ article.publishDate, X, Y+=10);

    Y=Y+20;

    const lignes_abstract=Math.floor(article.abstract.length / strd);
    console.log('lignes_abstract ', lignes_abstract);
    pdf.setFont('times', 'bold');
    pdf.text('Abstract : ', X , Y+=10);
    pdf.setFont('times', 'normal');
    temp_cara=0;

    for (let i = 1; i <= lignes_abstract; i++) {
      console.log('ligne ', i);
      const chunk_abstract = article.abstract.substring((i-1)*strd, i*strd);
      console.log('chunk  : ',chunk_abstract);
      pdf.text(chunk_abstract, X , Y+=10);
      temp_cara=i*strd;
      if (Y > 280) {
        // Si la position Y dépasse la limite, ajoutez un saut de page
        pdf.addPage();
        Y = 20; // Réinitialisez la position Y pour la nouvelle page
      }
  
    }
    if(temp_cara<=article.abstract.length){
      const chunk_abstract = article.abstract.substring(temp_cara, article.abstract.length-1);
      console.log('chunk 2 : ',chunk_abstract);
      pdf.text(chunk_abstract, X , Y+=10);
    }

    if (Y > 280) {
      // Si la position Y dépasse la limite, ajoutez un saut de page
      pdf.addPage();
      Y = 20; // Réinitialisez la position Y pour la nouvelle page
    }

    Y+=20;
    let ref = article.references.replace(/(\r\n|\n|\r)/gm, " ");
    const lignes_ref=Math.floor(ref.length / strd);
    console.log('lignes_ref ', lignes_ref);
    pdf.setFont('times', 'bold');
    pdf.text('References : ', X , Y+=10);
    pdf.setFont('times', 'normal');
    temp_cara=0;

    for (let i = 1; i <= lignes_ref; i++) {
      console.log('ligne ', i);
      const chunk_ref = ref.substring((i-1)*strd, i*strd);
      console.log('chunk  : ',chunk_ref);
      pdf.text(chunk_ref, X , Y+=10);
      temp_cara=i*strd;
      if (Y > 280) {
        // Si la position Y dépasse la limite, ajoutez un saut de page
        pdf.addPage();
        Y = 20; // Réinitialisez la position Y pour la nouvelle page
      }
  
    }
    if(temp_cara<=ref.length){
      const chunk_ref = ref.substring(temp_cara, ref.length-1);
      console.log('chunk 2 : ',chunk_ref);
      pdf.text(chunk_ref, X , Y+=10);
    }
    if (Y > 280) {
      // Si la position Y dépasse la limite, ajoutez un saut de page
      pdf.addPage();
      Y = 20; // Réinitialisez la position Y pour la nouvelle page
    }

    
    pdf.setFont('times', 'bold');
    pdf.text('Integral Text:', 10, Y+=20);
    
    if (Y > 280) {
      // Si la position Y dépasse la limite, ajoutez un saut de page
      pdf.addPage();
      Y = 20; // Réinitialisez la position Y pour la nouvelle page
    }
    pdf.setFont('times', 'normal');
    pdf.autoTable({ startY: Y+70, body: [[firstHalfIntegralText, secondHalfIntegralText]] });
    if (Y > 280) {
      // Si la position Y dépasse la limite, ajoutez un saut de page
      pdf.addPage();
      Y = 20; // Réinitialisez la position Y pour la nouvelle page
    }
  
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

export default DetailArticle;
