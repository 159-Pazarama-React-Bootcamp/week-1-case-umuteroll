var creditCardInput = document.getElementById("creditCardInput");
var returnText      = document.getElementById("returnText");
var btnCalculate    = document.getElementById("btnCalculate");
btnCalculate.addEventListener("click",function(){
    
    var creditCard = creditCardInput.value;
creditCard = creditCard.replaceAll("-","")
returnText.innerHTML = startValidation(creditCard);


  function startValidation(creditCard){
    //burada parseInt yerine Number kulalnıyorum olası rakam harici girdiler için

   if(isNaN(Number(creditCard))){
       return "Lütfen sadece sayılardan oluşan bir kredi kartı numarası girin"
   }
   if(creditCard.length != 16){
    return "Lütfen 16 hane girdiğinizden emin olun";
   }
   return isEven(creditCard); 

}

 function isEven(creditCard){
     //2ye bölümünden kalana bakıyoruz
    if(Number(creditCard) % 2 != 0){
        return "Girdiğiniz kredi kartının sonu çift değil";
    }
    return calculateCreditCardNumberValue(creditCard);
}

  function calculateCreditCardNumberValue(creditCard){
      var creditCardNumber = Number(creditCard);
      var sum=0;
      var firstDigit = creditCardNumber % 10 
      var flag = false;
      //while döngüsünde kredi kartı rakamları toplamına bakıyoruz, ilk başta bir flag ve first digit ile tüm rakamların aynı olup olmadığını kontrol ediyoruz
      while(creditCardNumber>0){
           onesDigit = creditCardNumber % 10 
           sum += onesDigit;
           creditCardNumber = parseInt(creditCardNumber / 10);
           if(firstDigit != onesDigit){
            flag = true;
        }
      }
      if(sum < 16){
          return "Kredi kartı numarası toplam 16dan büyük olmalıdır"
      }
      if(!flag){
       return "Tüm sayılar aynı olamaz!"
      }
      return checkForValidationWithLuhn(creditCard);
  }
    
  function checkForValidationWithLuhn(creditCard){
      //Luhn algoritmasına göre tek ve çift indexli rakamlara farklı işlemler uyguluyoruz teeke indexli rakamların 2 katı 2 haneli olursa mod 10 alıp bir arttırıyorum 
      var sumEven = 0;
      var sumOdd = 0;
      for(var i  = 0; i<creditCard.length; i++){
          if(i%2 == 0){
              if(Number(creditCard[i])>4){
                  sumOdd+= ((2*Number(creditCard[i])) % 10 ) + 1;
              }else{
                  sumOdd+=2*Number(creditCard[i])
              }

          }else{
          sumEven+=Number(creditCard[i]);
          }
      }
      var sumTotal = sumEven + sumOdd;
      if(sumTotal % 10 != 0){
           return "Luhn a göre hatalı bir kredi kartı!"
      }
     return "Girdiğiniz kredi kartı tamamen geçerli!";
  }
 
 })



