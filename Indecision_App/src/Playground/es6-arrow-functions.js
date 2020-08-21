const user = {
   name:"Nikhil",
   cities:['Nagpur','Hyderbad','Gandhinagar'],
   liveInPlaces: () => {
       this.cities.forEach( (city) => {
           console.log(this.name + 'has lived in' + city);
       });
   }
};

user.liveInPlaces();