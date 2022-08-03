let array =  [
  
    { 
      _id: "62ea90cfe9c998bdc124cb34",
      message: 'test1',
      createdAt: 2022-08-03T15:14:40.112Z,
      __v: 0
    },
    {
      _id: "62ea90d4e9c998bdc124cb37",
      message: 'test2',
      createdAt: 2022-08-03T15:14:34.366Z,
      __v: 0
    }
  
  ].map(obj => {
     return {...obj, createdAt: new Date(obj.createdAt)}

    });
    const sortedDesc = array.sort(
        (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt),
      );
 
    console.log(array)

//     const arr1 = [
//         {id: 3, date: '2022-02-24'},
//         {id: 5, date: '2027-02-24'},
//         {id: 2, date: '2023-02-24'},
//       ].map(obj => {
//         return {...obj, date: new Date(obj.date)};
//       });
      
//       console.log(arr1);
      
//       // ✅ Sort in Ascending order (low to high)
//       const sortedAsc = arr1.sort(
//         (objA, objB) => Number(objA.date) - Number(objB.date),
//       );
      
//       // 👇️ {id: 3, date: Thu Feb 24 2022,
//       //     id: 2, date: Fri Feb 24 2023
//       //     id: 5, date: Wed Feb 24 2027}
//       console.log(sortedAsc);
      
//       // ✅ Sort in Descending order (high to low)
//       const sortedDesc = arr1.sort(
//         (objA, objB) => Number(objB.date) - Number(objA.date),
// );
// console.log(sortedDesc);