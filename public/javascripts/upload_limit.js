var uploadField = document.getElementById("image");

uploadField.onchange = function () {
  if (this.files[0].size > 1048576) {
    alert("File is too big! Must be less than 1MB!");
    this.value = "";
  }
};
