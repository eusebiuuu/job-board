
export default function getIDs(obj, field) {
  const ans = [];
  obj.map(elem => {
    if (elem[field]) {
      ans.push(elem[field]);
    }
  });
  return ans;
}