import axios from "axios";


function GetLinkImage(path) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const formData = new FormData();
            formData.append('image', path);
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload/image`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                resolve(response.data?.url);
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsDataURL(path);
    });
}

export default GetLinkImage;