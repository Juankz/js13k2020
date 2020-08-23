function detectPremiumUser () {
  return new Promise((resolve, reject) => {
    if(document.monetization) {
      if(document.monetization && document.monetization.state === 'started') {
        resolve()
      }else{
        document.monetization.addEventListener('monetizationstart', () => {
          resolve()
        })
      }
    }else{
      reject("404 web monetization not found")
    }
  });
}

export default detectPremiumUser;