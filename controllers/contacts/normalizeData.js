function normalizeData(data) {
  const convertTextData = data.toString();
  return JSON.parse(convertTextData);
}

module.exports = {
  normalizeData,
};
