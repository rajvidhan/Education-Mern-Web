export const formattedDate = (date) => {

   const formateDate =  new Date(date);
 

   const formatedDate = formateDate.toLocaleDateString("en-GB", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  
    
    return formatedDate;
  }