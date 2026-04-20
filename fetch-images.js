import fs from 'fs';

async function fetchMetObjects() {
  const deptId = 12; 
  const searchRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${deptId}&q=antique&hasImages=true`);
  const searchData = await searchRes.json();
  const objectIds = searchData.objectIDs.slice(0, 50); 
  
  const validObjects = [];
  for (const id of objectIds) {
    if (validObjects.length >= 20) break;
    const objRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    const objData = await objRes.json();
    if (objData.primaryImageSmall) {
      validObjects.push({
        name: objData.title,
        image: objData.primaryImageSmall,
        era: objData.culture || 'Unknown Era',
        originalUrl: objData.primaryImage
      });
    }
  }
  
  fs.writeFileSync('met_images.json', JSON.stringify(validObjects, null, 2));
  console.log('Fetched ' + validObjects.length + ' objects');
}

fetchMetObjects().catch(console.error);
