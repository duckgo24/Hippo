

function GetLinkImage(path) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const imgBase64 = reader.result.split(',')[1];
            try {
                const formData = new FormData();
                formData.append('image', imgBase64);
    
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`, {
                    method: 'POST',
                    body: formData,
                });
    
                const data = await res.json();
                resolve(data.data?.url);
            } catch (error) {
                reject(error);
            }
        };
        reader.readAsDataURL(path);
    });
}

export default GetLinkImage;