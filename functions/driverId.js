const generateDriverId = (id) => {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let driverId = "";

   for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      driverId += characters.charAt(randomIndex);
   }

   return `K-${driverId}:${id+1}`;
};

module.exports = generateDriverId;
