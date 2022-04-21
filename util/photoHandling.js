function generateName()
  {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let name = '';
    for (let i=0; i < 64; i ++){
      let char = charset[Math.floor(Math.random()*charset.length)];
      name = name + char;
    }
  return name;
}

function getExtension(filename)
{
  return filename.split(".").pop()
}

module.exports = {
  generateName,
  getExtension
}