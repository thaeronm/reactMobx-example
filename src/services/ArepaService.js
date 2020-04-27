const url = "http://localhost:2000/api/arepas";

class ArepaService {
    
    get = async () => {
        const options = {
            method: "GET",
        }
        const request = new Request(url, options);
        const response = await fetch(request);
        return response.json();
    }

    post = async (arepa) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        var options = {
            method: "POST",
            headers,
            body: JSON.stringify({arepa})
        }
        const request = new Request(url+'/create', options);
        const response = await fetch(request);
        return response.json();
    }

    delete = async (id) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const options = {
            method: "DELETE",
            headers
        }
        const request = new Request(url + "/delete/" + id, options);
        const response = await fetch(request);
        return response;
    }

}

export default ArepaService;