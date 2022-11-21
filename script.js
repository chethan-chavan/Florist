// api url

const api_url ="https://visionet.essentialintelligence.com/api/essential-system/audit/v1/audit-events?start=0&limit=4000&context.type.repository=cabb6e774a66e3aa0d94&fromDate=2022-11-15&toDate=2022-11-16";

// Defining async function
async function getapi(url) {
	
	// // Storing response
	// const response = await fetch(url, {
    //      headers: {
    //     'x-api-key': '53I0sSpLNIDrH9Qju30OEY:7G4KyeFAdFn6OkOFzPcUvj',
    //     'Authorization' : 'Bearer eyJleHBpcnlEYXRlVGltZSI6IjIwMjItMTEtMTZUMTk6MDU6NDFaIiwidGVuYW50SWQiOiI4ZjZjZmRjN2M0ZTY0OGE1ZDRjMSIsInVzZXJJZCI6IjE4ZDVhNmFhNThkZmIyYmU1MjcxIiwidG9rZW5UeXBlIjoic2hvcnQtbGlmZSJ9.F7M31xA3kC4VML1amyf5rIl77qNPLuDgRQYN8Tv61BePAVTtv0jRaE9FKqC3mdHdLaU4HW2GKux09lwAzcqkMyjKAJeLfxx0CxEnM7GN8My8HoK5fVybIguRKTz6O%2BT%2BrfPuGcHGo1zpvWxQ6U0MDU%2BedGOa20%2B%2FgzbBYpo5CWoK48fCIUeQJHIIafp%2FI3FU5Ol8Vui%2BsDNIASWuFMiyROU7ro8rayJ4iyxHVjZBbxpUDu8ZWwIkgXRQJw1%2FH%2FWm06OZV5cEeG55N3Yxf8JNqtz8vja3eA0ag8kQvKnDnUw%2FfU1Ixg7ecduqZcNidXS9qyIcFb%2B3VdrmN6Ao4gc1Zw%3D%3D',
    //     'Content-Type' : 'application/json',

    //     'Access-Control-Allow-Origin' : '*',
    //     'Accept': "*/*",
    //     "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    //   }
    // });

	
	// // Storing data in form of JSON
	// var data = await response.json();
	// console.log(data);
	// if (response) {
	// 	hideloader();
	// }
	// show(data);

    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "x-api-key": "53I0sSpLNIDrH9Qju30OEY:7G4KyeFAdFn6OkOFzPcUvj"
       }
       
       let bodyContent = JSON.stringify({
         "grantType": "password",
         "username": "chethan.chavan@visionet.com",
         "password": "Falcon1211"
       });
       
       let response = await fetch("https://visionet.essentialintelligence.com//api/oauth/token", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       const obj = JSON.parse(data);

       console.log("First API Data")
       console.log(obj.bearerToken);

       document.getElementById('bearerId').innerHTML = obj.bearerToken;

       let headersList2 = {
        "Accept": "*/*",
        "x-api-key": "53I0sSpLNIDrH9Qju30OEY:7G4KyeFAdFn6OkOFzPcUvj",
        "Authorization": "Bearer " + obj.bearerToken,
        "Content-Type": "application/json"
       }

       console.log("Header List for Composite APplication Provider")
       console.log(headersList2)

       console.log("Composite Application Provider")
       let response3 = await fetch("https://visionet.essentialintelligence.com//api/essential-utility/v3/repositories/338ff72ed1e908f2e7d7/classes/Composite_Application_Provider/instances", { 
        method: "GET",
        headers: headersList2
        });

        let data3 = await response3.text();
        console.log(data3);
        const obj2 = JSON.parse(data3);
        
        var compData = '';
        for(let i = 0; i < obj2.instances.length; i++) {
            compData += "ID : " + obj2.instances[i].id + '<br>';
            compData += "Name : " + obj2.instances[i].name + '<br>';
            compData += "EA Reference : " + obj2.instances[i].ea_reference + '<br>';
            
            compData += '<br><br>'
        }

        document.getElementById('compData').innerHTML = JSON.stringify(compData);


       console.log("Header List for Audit API")
       console.log(headersList2)

       try {
        let response2 = await fetch("https://visionet.essentialintelligence.com//api/essential-system/audit/v1/audit-events?start=0&limit=40&context.type.repository=338ff72ed1e908f2e7d7", { 
         method: "GET",
         headers: headersList2
       });
       
       let data2 = await response2.text();
       console.log(data2);
   } catch (e) {
    document.getElementById('auditData').innerHTML = e.stack;
   }
       
      
       
       
}
// Calling that async function
getapi(api_url);

// Function to hide the loader
function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
