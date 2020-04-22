
function getDates(startDate, endDate) {
    for(var arr=[],dt=new Date(startDate); dt<=endDate; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
}


module.exports = {
  getDates: getDates
}
// var date1 = new Date(1995, 11, 17)
// var date2 = new Date(1995, 11, 19)
// getMail(date1, date2)
