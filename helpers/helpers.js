class Helpers {
  static RemoveIDFromArray(arr, remove_id){
    let index = arr.indexOf(remove_id);
      if (index > -1) {
        arr.splice(index, 1);
        return arr;
      }
      else{
        return arr;
      }
  }
}

module.exports = Helpers;